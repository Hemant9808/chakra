import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';
import useReviewStore from '../../Store/useReviewStore';
import useAuthStore from '../../Store/useAuthStore';
import { MessageCircle, Plus } from 'lucide-react';

const ReviewsList = ({ productId }) => {
    const [showForm, setShowForm] = useState(false);
    const [sortBy, setSortBy] = useState('-createdAt');

    const { user } = useAuthStore();
    const {
        reviews,
        loading,
        pagination,
        fetchProductReviews,
        createReview,
        updateReview,
        deleteReview,
        voteReview,
    } = useReviewStore();

    useEffect(() => {
        fetchProductReviews(productId, 1, sortBy);
    }, [productId, sortBy]);

    const handleSubmitReview = async (productId, formData) => {
        await createReview(productId, formData);
        setShowForm(false);
    };

    const handleUpdateReview = async (reviewId, updateData) => {
        await updateReview(reviewId, updateData);
    };

    const handleDeleteReview = async (reviewId) => {
        await deleteReview(reviewId);
    };

    const handleVote = async (reviewId, type) => {
        try {
            await voteReview(reviewId, type);
        } catch (error) {
            // Error already handled in store
        }
    };

    const handleLoadMore = () => {
        if (pagination.current < pagination.pages) {
            fetchProductReviews(productId, pagination.current + 1, sortBy);
        }
    };

    // Calculate average rating
    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    // Rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: reviews.filter(r => r.rating === star).length,
        percentage: reviews.length > 0
            ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100
            : 0,
    }));

    return (
        <div className="mt-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Customer Reviews
                    </h2>
                    <div className="flex items-center gap-4">
                        <StarRating
                            rating={averageRating}
                            readonly
                            size="medium"
                            showCount
                            count={reviews.length}
                        />
                    </div>
                </div>

                {user && !showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition shadow-md"
                    >
                        <Plus size={20} />
                        Write a Review
                    </button>
                )}
            </div>

            {/* Rating Distribution */}
            {reviews.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                    <div className="space-y-2">
                        {ratingDistribution.map(({ star, count, percentage }) => (
                            <div key={star} className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700 w-12">
                                    {star} star
                                </span>
                                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-600 w-12 text-right">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Review Form */}
            {showForm && (
                <div className="mb-8">
                    <ReviewForm
                        productId={productId}
                        onSubmit={handleSubmitReview}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            {/* Sort Options */}
            {reviews.length > 0 && (
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <p className="text-gray-600">
                        Showing {reviews.length} of {pagination.total} reviews
                    </p>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="-createdAt">Most Recent</option>
                        <option value="createdAt">Oldest First</option>
                        <option value="-rating">Highest Rated</option>
                        <option value="rating">Lowest Rated</option>
                        <option value="-helpfulCount">Most Helpful</option>
                    </select>
                </div>
            )}

            {/* Reviews List */}
            {loading && reviews.length === 0 ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading reviews...</p>
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No reviews yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Be the first to review this product!
                    </p>
                    {user && !showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition"
                        >
                            Write a Review
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                            currentUserId={user?._id}
                            onVote={handleVote}
                            onEdit={handleUpdateReview}
                            onDelete={handleDeleteReview}
                            isAdmin={user?.role === 'admin'}
                        />
                    ))}

                    {/* Load More */}
                    {pagination.current < pagination.pages && (
                        <div className="text-center pt-6">
                            <button
                                onClick={handleLoadMore}
                                disabled={loading}
                                className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition disabled:opacity-50"
                            >
                                {loading ? 'Loading...' : 'Load More Reviews'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewsList;
