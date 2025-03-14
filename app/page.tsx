'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import HotelList from "./components/HotelList";
import { getHotelData } from "./services/hotelData";
import { Hotel } from "./types";

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
        console.error("Error fetching hotel data:", error);
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
          <div className="flex justify-center items-center h-64">
            <div
              role="status"
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"
              aria-label="Loading"
            ></div>
          </div>
        ) : (
          <HotelList hotels={hotels} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-12 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Qantas Airways Limited ABN</p>
        </div>
      </footer>
    </div>
  );
}
