// lib/recipe.js
import { connectToDatabase } from './mongodb';
import config from './config';

async function getPaginatedRecipes(query = {}, page = 1, limit = 10, sort = { datePublished: -1 }) {
    const { db } = await connectToDatabase();
    const recipesCollection = db.collection('recipes');

    const skip = (page - 1) * limit;

    const totalCount = await recipesCollection.countDocuments(query);
    const data = await recipesCollection.find(query)
                                        .sort(sort)
                                        .skip(skip)
                                        .limit(limit)
                                        .toArray();

    return {
        data: data,
        total_count: totalCount,
        count: data.length,
        total_pages: Math.ceil(totalCount / limit),
        current_page: parseInt(page, 10),
    };
}

// ----> الدالة المحدثة <----
/**
 * يجلب الوصفات مع تقسيم الصفحات، مع إمكانية الفلترة حسب الفئة.
 * @param {number} page - رقم الصفحة.
 * @param {number} limit - عدد الوصفات لكل صفحة.
 * @param {string|undefined} category - (اختياري) الكلمة المفتاحية للفئة للفلترة.
 * @returns {Promise<object>}
 */
export async function getRecipe(page = 1, limit = config.blog.postPerPage, category = undefined) {
    const sort = { datePublished: -1 };
    let query = {};

    // إذا تم توفير فئة، أضفها إلى استعلام البحث
    if (category) {
        query = {
            recipeCategory: { $regex: category, $options: 'i' } // 'i' for case-insensitive
        };
    }
    
    return getPaginatedRecipes(query, page, limit, sort);
}

export async function getRecipeBySlug(slug) {
    const { db } = await connectToDatabase();
    const recipe = await db.collection('recipes').findOne({
        $or: [{ slug: slug }, { slugHistory: slug }]
    });
    return recipe ? { data: [recipe] } : { data: [] };
}

export async function getAllRecipeSlugs() {
    const { db } = await connectToDatabase();
    const recipes = await db.collection('recipes').find({}, { projection: { slug: 1 } }).toArray();
    return recipes.map(recipe => recipe.slug);
}

export async function getAllRecipes() {
    const { db } = await connectToDatabase();
    const recipes = await db.collection('recipes').find({}).sort({ datePublished: -1 }).toArray();
    return { data: recipes, total_count: recipes.length };
}
