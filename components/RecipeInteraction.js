// components/RecipeInteraction.js
import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import {
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
    EmailIcon,
} from 'react-share';

const RecipeInteraction = ({ recipeId, currentUrl }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRatingSubmit = async (rating) => {
        if (userRating > 0 || isSubmitting) return; // منع التقييم المزدوج

        setIsSubmitting(true);
        setUserRating(rating); // تحديث الواجهة فورًا
        setMessage('');

        try {
            const res = await fetch('/api/rate-recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipeId, newRating: rating }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            
            setMessage(data.message || 'Tack för din feedback!');
        } catch (error) {
            setMessage(`Ett fel uppstod: ${error.message}`);
            setUserRating(0); // إعادة التقييم في حال الفشل
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setMessage('Tack för din kommentar! Vi uppskattar din feedback.');
        setComment('');
    };

    return (
        <div className="bg-gray-50 p-6 md:p-8 rounded-lg border border-gray-200 mt-12 text-center">
            {/* عنوان مزخرف */}
            <h3 className="font-serif text-2xl text-primary mb-6 italic">Vad tyckte du om receptet?</h3>
            
            {/* نظام التقييم بالنجوم */}
            <div className="flex justify-center items-center space-x-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                        key={star}
                        onClick={() => handleRatingSubmit(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`h-10 w-10 cursor-pointer transition-colors duration-200 ${
                            (hoverRating || userRating) >= star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>

            {/* أزرار المشاركة */}
            <div className="flex justify-center items-center space-x-3 mb-8">
                <p className="text-sm font-semibold text-gray-600 mr-2">Dela:</p>
                <FacebookShareButton url={currentUrl}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={currentUrl}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <PinterestShareButton url={currentUrl} media={currentUrl}>
                    <PinterestIcon size={32} round />
                </PinterestShareButton>
                <EmailShareButton url={currentUrl}>
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
            
            {/* نموذج التعليقات الوهمي */}
            <form onSubmit={handleCommentSubmit} className="max-w-lg mx-auto">
                 <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 border rounded-md"
                    placeholder="Skriv en kommentar..."
                    rows="4"
                 />
                 <button type="submit" className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors mt-4">
                    Skicka kommentar
                 </button>
            </form>

            {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
        </div>
    );
};

export default RecipeInteraction;