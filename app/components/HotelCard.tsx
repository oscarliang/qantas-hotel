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

    return <div className="my-1 flex sm:ml-2 sm:mt-2">{icons}</div>;
  };

  return (
    <div className="flex flex-col border-b  border-gray-200 py-4 sm:flex-row">
      {/* Promotion Tag */}
      <div className="relative">
        {promotion && (
          <span className="absolute left-0 top-2 z-10 bg-white px-2 py-1 text-xs text-red-600">
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
      <div className="flex-1 px-2 py-2 sm:px-4">
        <div className="flex flex-col justify-between sm:flex-row">
          <div className="relative min-h-32 sm:min-h-28">
            <div className="justify-content flex flex-col align-middle sm:flex-row">
              <h2 className="text-lg font-bold">{title}</h2>
              {/* Rating */}
              {renderRating()}
            </div>
            <address className="text-sm not-italic text-gray-600">{address.join(', ')}</address>

            {/* Room Type */}
            <p className="mt-2 text-sm font-medium text-red-600 underline">{roomName}</p>

            {/* Cancellation */}
            {cancellationType === 'FREE_CANCELLATION' && (
              <p className="absolute bottom-0 mt-2 text-sm text-green-600">Free cancellation</p>
            )}
          </div>

          {/* Price Information */}
          <div className="mt-4 text-right sm:mt-0">
            <div className="text-sm text-gray-600">1 night total (AUD)</div>
            <div className="mt-1 text-2xl font-bold">
              <span className="text-lg">$</span>
              {price.amount.toFixed(0)}
            </div>

            {/* Savings */}
            {savings && (
              <div className="text-sm text-red-600">Save ${savings.amount.toFixed(0)}~</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
