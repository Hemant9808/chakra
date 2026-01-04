import React, { useState } from 'react';

const StarRating = ({
    rating = 0,
    onChange = null,
    readonly = false,
    size = 'medium',
    showCount = false,
    count = 0
}) => {
    const [hoverRating, setHoverRating] = useState(0);

    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-6 h-6',
        large: 'w-8 h-8'
    };

    const handleClick = (value) => {
        if (!readonly && onChange) {
            onChange(value);
        }
    };

    const handleMouseEnter = (value) => {
        if (!readonly) {
            setHoverRating(value);
        }
    };

    const handleMouseLeave = () => {
        if (!readonly) {
            setHoverRating(0);
        }
    };

    const displayRating = hoverRating || rating;

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => handleClick(value)}
                    onMouseEnter={() => handleMouseEnter(value)}
                    onMouseLeave={handleMouseLeave}
                    disabled={readonly}
                    className={`
            ${sizeClasses[size]}
            ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
            transition-transform duration-150
            focus:outline-none
          `}
                    aria-label={`Rate ${value} stars`}
                >
                    <svg
                        className={`
              w-full h-full
              ${value <= displayRating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                            }
            `}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </button>
            ))}

            {showCount && count > 0 && (
                <span className="ml-2 text-sm text-gray-600">
                    ({count} {count === 1 ? 'review' : 'reviews'})
                </span>
            )}

            {!readonly && !showCount && (
                <span className="ml-2 text-sm text-gray-600">
                    {hoverRating || rating || 'Select rating'}
                </span>
            )}
        </div>
    );
};

export default StarRating;
