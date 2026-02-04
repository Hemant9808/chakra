import axiosInstance from '../axios';

export const rewardService = {
    /**
     * Generate a new reward for the authenticated user
     * @returns {Promise} Reward object with code and cashback amount
     */
    generateReward: async () => {
        try {
            const response = await axiosInstance.post('/rewards/generate');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to generate reward' };
        }
    },

    /**
     * Claim a reward by sending WhatsApp message
     * @param {string} rewardId - The reward ID to claim
     * @returns {Promise} Claimed reward details
     */
    claimReward: async (rewardId) => {
        try {
            const response = await axiosInstance.post(`/rewards/${rewardId}/claim`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to claim reward' };
        }
    },

    /**
     * Get all rewards for the authenticated user
     * @returns {Promise} List of user's rewards
     */
    getUserRewards: async () => {
        try {
            const response = await axiosInstance.get('/rewards/my-rewards');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch rewards' };
        }
    }
};
