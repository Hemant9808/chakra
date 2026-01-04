import React, { useState } from 'react';
import StarRating from './StarRating';
import { ThumbsUp, ThumbsDown, Edit, Trash2, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ReviewCard = ({
    review,
    currentUserId,
    onVote,
    onEdit,
    onDelete,
    isAdmin = false
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedReview, setEditedReview] = useState({
        rating: review.rating,
        title: review.title,
        comment: review.comment
    });

    const isOwner = review.userId?._id === currentUserId;
    const canEdit = isOwner || isAdmin;

    const handleSaveEdit = async () => {
        try {
            await onEdit(review._id, editedReview);
            setIsEditing(false);
            toast.success('Review updated successfully');
        } catch (error) {
            toast.error('Failed to update review');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await onDelete(review._id);
                toast.success('Review deleted successfully');
            } catch (error) {
                toast.error('Failed to delete review');
            }
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
                        {review.userId?.firstName?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">
                            {review.userId?.firstName} {review.userId?.lastName}
                        </h4>
                        <p className="text-sm text-gray-500">
                            {formatDate(review.createdAt)}
                        </p>
                    </div>
                    {review.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                            <Check size={12} />
                            Verified Purchase
                        </span>
                    )}
                </div>

                {canEdit && !isEditing && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit review"
                        >
                            <Edit size={18} />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete review"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Rating and Title */}
            {isEditing ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                        </label>
                        <StarRating
                            rating={editedReview.rating}
                            onChange={(value) => setEditedReview(prev => ({ ...prev, rating: value }))}
                            size="medium"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={editedReview.title}
                            onChange={(e) => setEditedReview(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            maxLength={100}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Review
                        </label>
                        <textarea
                            value={editedReview.comment}
                            onChange={(e) => setEditedReview(prev => ({ ...prev, comment: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            rows={4}
                            maxLength={1000}
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setEditedReview({
                                    rating: review.rating,
                                    title: review.title,
                                    comment: review.comment
                                });
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="mb-2">
                        <StarRating rating={review.rating} readonly size="small" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {review.title}
                    </h3>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                        {review.comment}
                    </p>

                    {/* Images */}
                    {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {review.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={`Review image ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                                    onClick={() => window.open(image.url, '_blank')}
                                />
                            ))}
                        </div>
                    )}

                    {/* Helpful/Unhelpful */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-600">Was this helpful?</span>

                        <button
                            onClick={() => onVote(review._id, 'helpful')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-green-100 hover:text-green-700 transition text-sm"
                            disabled={isOwner}
                        >
                            <ThumbsUp size={16} />
                            <span>{review.helpfulCount || 0}</span>
                        </button>

                        <button
                            onClick={() => onVote(review._id, 'unhelpful')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-700 transition text-sm"
                            disabled={isOwner}
                        >
                            <ThumbsDown size={16} />
                            <span>{review.unhelpfulCount || 0}</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ReviewCard;
