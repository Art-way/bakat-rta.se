// pages/api/rate-recipe.js
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { recipeId, newRating } = req.body;

        // 👇 الخطوة الأهم: التحقق من أن recipeId صالح
        if (!recipeId || typeof recipeId !== 'string' || recipeId.length !== 24) {
             // يمكنك أيضًا التحقق إذا كان slug بدلاً من id هنا إذا أردت
            return res.status(400).json({ message: `Invalid recipeId received: ${recipeId}` });
        }
        if (!newRating || newRating < 1 || newRating > 5) {
            return res.status(400).json({ message: 'Invalid input. A rating between 1-5 is required.' });
        }

        const { db } = await connectToDatabase();
        const collection = db.collection('recipes');
        
        // الآن يمكننا استخدام new ObjectId بأمان
        const recipeObjectId = new ObjectId(recipeId);

        const recipe = await collection.findOne({ _id: recipeObjectId });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found.' });
        }
        
        const currentRatingValue = recipe.aggregateRating?.ratingValue || 0;
        const currentRatingCount = recipe.aggregateRating?.ratingCount || 0;
        
        const totalRatingPoints = (currentRatingValue * currentRatingCount) + newRating;
        const newRatingCount = currentRatingCount + 1;
        const newAverageRating = totalRatingPoints / newRatingCount;

        const result = await collection.updateOne(
            { _id: recipeObjectId },
            { 
                $set: {
                    'aggregateRating.ratingValue': parseFloat(newAverageRating.toFixed(2)),
                    'aggregateRating.ratingCount': newRatingCount
                }
            }
        );
        
        if (result.modifiedCount === 0) {
            throw new Error('Failed to update recipe rating.');
        }

        res.status(200).json({ 
            message: 'Tack för din feedback!',
            newRatingValue: parseFloat(newAverageRating.toFixed(2)),
            newRatingCount: newRatingCount
        });

    } catch (error) {
        // تحسين رسالة الخطأ لتشمل تفاصيل أكثر
        console.error('Rating API Error:', error);
        res.status(500).json({ message: 'An error occurred.', error: error.message, type: error.name });
    }
}