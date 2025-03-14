'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import HotelList from './components/HotelList';
import { getHotelData } from './services/hotelData';
import { Hotel } from './types';

export default function Home() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const data = getHotelData();
        setHotels(data.results);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Image
            src="/qantas-logo.png"
            alt="Qantas Logo"
            width={120}
            height={30}
            priority
            className="h-8 w-auto"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div
              role="status"
              className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-red-600"
              aria-label="Loading"
            ></div>
          </div>
        ) : (
          <HotelList hotels={hotels} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Qantas Airways Limited ABN</p>
        </div>
      </footer>
    </div>
  );
}
