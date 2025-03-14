import React, { useState, useMemo } from 'react';
import HotelCard from './HotelCard';
import SortDropdown from './SortDropdown';
import { Hotel } from '../types';

type HotelListProps = {
  hotels: Hotel[];
};

type SortOption = 'high-low' | 'low-high';

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  const [sortOption, setSortOption] = useState<SortOption>('high-low');

  const sortedHotels = useMemo(() => {
    if (!hotels) return [];

    return [...hotels].sort((a, b) => {
      const priceA = a.offer.displayPrice.amount;
      const priceB = b.offer.displayPrice.amount;

      return sortOption === 'high-low'
        ? priceB - priceA // high to low
        : priceA - priceB; // low to high
    });
  }, [hotels, sortOption]);

  if (!hotels || hotels.length === 0) {
    return <div className="py-8 text-center">No hotels found.</div>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-bold">{hotels.length}</span>
          <span className="italic text-gray-600"> hotels in </span>
          <span className="font-bold">Sydney</span>.
        </div>
        <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
      </div>

      <div className="hotel-list">
        {sortedHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            propertyId={hotel.property.propertyId}
            title={hotel.property.title}
            address={hotel.property.address}
            imageUrl={hotel.property.previewImage.url}
            imageCaption={hotel.property.previewImage.caption}
            rating={hotel.property.rating}
            promotion={hotel.offer.promotion}
            roomName={hotel.offer.name}
            price={hotel.offer.displayPrice}
            savings={hotel.offer.savings}
            cancellationType={hotel.offer.cancellationOption.cancellationType}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
