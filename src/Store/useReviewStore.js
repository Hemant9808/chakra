import { create } from 'zustand';
import axiosInstance from '../axios';

const useReviewStore = create((set, get) => ({
    reviews: [],
    userReviews: [],
    loading: false,
    error: null,
    pagination: {
        current: 1,
        pages: 1,
        total: 0,
    },

    // Create a new review
    createReview: async (productId, reviewData) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.post('/reviews', {
                productId,
                ...reviewData,
            });

            // Refresh reviews for this product
            await get().fetchProductReviews(productId);

            set({ loading: false });
            return response.data.review;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create review';
            set({ error: errorMessage, loading: false });
            throw new Error(errorMessage);
        }
    },

    // Get all reviews for a product
    fetchProductReviews: async (productId, page = 1, sort = '-createdAt') => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get(`/reviews/product/${productId}`, {
                params: { page, sort, limit: 10 },
            });

            set({
                reviews: response.data.reviews,
                pagination: response.data.pagination,
                loading: false,
            });

            return response.data.reviews;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch reviews';
            set({ error: errorMessage, loading: false });
            throw new Error(errorMessage);
        }
    },

    // Get user's reviews
    fetchUserReviews: async (page = 1) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get('/reviews/user/my-reviews', {
                params: { page, limit: 10 },
            });

            set({
                userReviews: response.data.reviews,
                pagination: response.data.pagination,
                loading: false,
            });

            return response.data.reviews;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch user reviews';
            set({ error: errorMessage, loading: false });
            throw new Error(errorMessage);
        }
    },

    // Update a review
    updateReview: async (reviewId, updateData) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.patch(`/reviews/${reviewId}`, updateData);

            // Update the review in the local state
            set(state => ({
                reviews: state.reviews.map(review =>
                    review._id === reviewId ? response.data.review : review
                ),
                userReviews: state.userReviews.map(review =>
                    review._id === reviewId ? response.data.review : review
                ),
                loading: false,
            }));

            return response.data.review;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update review';
            set({ error: errorMessage, loading: false });
            throw new Error(errorMessage);
        }
    },

    // Delete a review
    deleteReview: async (reviewId) => {
        set({ loading: true, error: null });
        try {
            await axiosInstance.delete(`/reviews/${reviewId}`);

            // Remove the review from local state
            set(state => ({
                reviews: state.reviews.filter(review => review._id !== reviewId),
                userReviews: state.userReviews.filter(review => review._id !== reviewId),
                loading: false,
            }));
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete review';
            set({ error: errorMessage, loading: false });
            throw new Error(errorMessage);
        }
    },

    // Vote on a review (helpful/unhelpful)
    voteReview: async (reviewId, type) => {
        try {
            const response = await axiosInstance.post(`/reviews/${reviewId}/vote`, { type });

            // Update the vote counts in local state
            set(state => ({
                reviews: state.reviews.map(review =>
                    review._id === reviewId
                        ? {
                            ...review,
                            helpfulCount: response.data.helpfulCount,
                            unhelpfulCount: response.data.unhelpfulCount,
                        }
                        : review
                ),
            }));

            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to vote on review';
            throw new Error(errorMessage);
        }
    },

    // Clear error
    clearError: () => set({ error: null }),

    // Reset state
    reset: () => set({
        reviews: [],
        userReviews: [],
        loading: false,
        error: null,
        pagination: {
            current: 1,
            pages: 1,
            total: 0,
        },
    }),
}));

export default useReviewStore;
