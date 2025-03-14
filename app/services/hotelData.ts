import { HotelData } from '../types';
import data from '../mock/data.json';

// This would normally be fetched from an API, but for now we'll use the static data
export const getHotelData = (): HotelData => {
    return data as HotelData;
}; 