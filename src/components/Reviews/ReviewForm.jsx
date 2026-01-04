import React, { useState } from 'react';
import StarRating from './StarRating';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ReviewForm = ({ productId, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        rating: 0,
        title: '',
        comment: '',
        images: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + imagePreviews.length > 5) {
            toast.error('Maximum 5 images allowed');
            return;
        }

        files.forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Each image must be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result]);
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, { url: reader.result }]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        if (!formData.title.trim()) {
            toast.error('Please enter a title');
            return;
        }

        if (!formData.comment.trim()) {
            toast.error('Please enter a review');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(productId, formData);
            toast.success('Review submitted successfully!');
            setFormData({ rating: 0, title: '', comment: '', images: [] });
            setImagePreviews([]);
        } catch (error) {
            toast.error(error.message || 'Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Rating */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating <span className="text-red-500">*</span>
                </label>
                <StarRating
                    rating={formData.rating}
                    onChange={(value) => setFormData(prev => ({ ...prev, rating: value }))}
                    size="large"
                />
            </div>

            {/* Title */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Summarize your experience"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    maxLength={100}
                    required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100</p>
            </div>

            {/* Comment */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Share your thoughts about this product..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={6}
                    maxLength={1000}
                    required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.comment.length}/1000</p>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Photos (Optional)
                </label>

                <div className="flex flex-wrap gap-4">
                    {/* Image Previews */}
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}

                    {/* Upload Button */}
                    {imagePreviews.length < 5 && (
                        <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <Upload size={24} className="text-gray-400 mb-1" />
                            <span className="text-xs text-gray-500">Add Photo</span>
                        </label>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Maximum 5 images, each up to 5MB
                </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ReviewForm;
