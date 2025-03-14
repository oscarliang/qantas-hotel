import React from 'react';
import Image from 'next/image';
import { StarIcon, CircleIcon } from './Icons';

type HotelCardProps = {
    id: string;
    propertyId: string;
    title: string;
    address: string[];
    imageUrl: string;
    imageCaption: string;
    rating: {
        ratingValue: number;
        ratingType: 'star' | 'self';
    };
    promotion?: {
        title: string;
        type: string;
    };
    roomName: string;
    price: {
        amount: number;
        currency: string;
    };
    savings?: {
        amount: number;
        currency: string;
    } | null;
    cancellationType: 'FREE_CANCELLATION' | 'NOT_REFUNDABLE';
};

const HotelCard: React.FC<HotelCardProps> = ({
    title,
    address,
    imageUrl,
    imageCaption,
    rating,
    promotion,
    roomName,
    price,
    savings,
    cancellationType,
}) => {
    const renderRating = () => {
        const icons = [];
        const fullStars = Math.floor(rating.ratingValue);
        const halfStar = rating.ratingValue % 1 !== 0;

        const IconComponent = rating.ratingType === 'star' ? StarIcon : CircleIcon;

        for (let i = 0; i < fullStars; i++) {
            icons.push(<IconComponent key={i} filled={true} />);
        }

        if (halfStar) {
            icons.push(<IconComponent key="half" filled={false} />);
        }

        // Add empty icons to reach 5 in total
        const emptyIcons = 5 - Math.ceil(rating.ratingValue);
        for (let i = 0; i < emptyIcons; i++) {
            icons.push(<IconComponent key={`empty-${i}`} filled={false} />);
        }

        return <div className="flex my-1 sm:mt-2 sm:ml-2">{icons}</div>;
    };

    return (
        <div className="flex flex-col sm:flex-row  border-b border-gray-200 py-4">
            {/* Promotion Tag */}
            <div className="relative">
                {promotion && (
                    <span className="absolute top-2 left-0 bg-white text-red-600 text-xs py-1 px-2 z-10">
                        {promotion.title}
                    </span>
                )}

                {/* Hotel Image */}
                <Image
                    src={imageUrl}
                    alt={imageCaption}
                    width={145}
                    height={125}
                    className="object-cover"
                />
            </div>

            {/* Hotel Details */}
            <div className="flex-1 px-2 sm:px-4 py-2">
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="relative min-h-32 sm:min-h-28">
                        <div className="flex flex-col sm:flex-row justify-content align-middle">
                            <h2 className="text-lg font-bold">{title}</h2>
                            {/* Rating */}
                            {renderRating()}
                        </div>
                        <address className="text-sm text-gray-600 not-italic">
                            {address.join(', ')}
                        </address>

                        {/* Room Type */}
                        <p className="text-red-600 text-sm mt-2 font-medium underline">{roomName}</p>

                        {/* Cancellation */}
                        {cancellationType === 'FREE_CANCELLATION' && (
                            <p className="text-sm text-green-600 mt-2 absolute bottom-0">Free cancellation</p>
                        )}
                    </div>

                    {/* Price Information */}
                    <div className="text-right mt-4 sm:mt-0">
                        <div className="text-sm text-gray-600">1 night total (AUD)</div>
                        <div className="text-2xl font-bold mt-1">
                            <span className="text-lg">$</span>
                            {price.amount.toFixed(0)}
                        </div>

                        {/* Savings */}
                        {savings && (
                            <div className="text-red-600 text-sm">
                                Save ${savings.amount.toFixed(0)}~
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelCard; 