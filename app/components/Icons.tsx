import React from 'react';

interface IconProps {
    filled: boolean;
}

export const StarIcon: React.FC<IconProps> = ({ filled }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill={filled ? "#fef08a" : "none"}
            stroke="#fef08a"
            strokeWidth="1"
            className="inline-block mx-0.5"
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
};

export const CircleIcon: React.FC<IconProps> = ({ filled }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill={filled ? "#fef08a" : "none"}
            stroke="#fef08a"
            strokeWidth="1"
            className="inline-block mx-0.5"
        >
            <circle cx="12" cy="12" r="8" />
        </svg>
    );
}; 