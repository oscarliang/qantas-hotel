import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HotelList from '../HotelList';
import { Hotel } from '../../types';

// Mock the child components
jest.mock('../HotelCard', () => {
    return jest.fn(({ title }: { title: string }) => (
        <div data-testid="hotel-card">{title}</div>
    ));
});

jest.mock('../SortDropdown', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return jest.fn(({ currentSort, onSortChange }: { currentSort: string; onSortChange: (sort: any) => void }) => (
        <div data-testid="sort-dropdown">
            <select
                data-testid="sort-select"
                value={currentSort}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="high-low">Price high-low</option>
                <option value="low-high">Price low-high</option>
            </select>
        </div>
    ));
});

describe('HotelList Component', () => {
    const mockHotels: Hotel[] = [
        {
            id: 'hotel1',
            property: {
                propertyId: 'P1',
                title: 'Expensive Hotel',
                address: ['Test Address 1'],
                previewImage: {
                    url: '/test1.jpg',
                    caption: 'Test Caption 1',
                    imageType: 'PRIMARY'
                },
                rating: {
                    ratingValue: 5,
                    ratingType: 'star'
                }
            },
            offer: {
                name: 'Deluxe Room',
                displayPrice: {
                    amount: 500,
                    currency: 'AUD'
                },
                savings: null,
                cancellationOption: {
                    cancellationType: 'FREE_CANCELLATION'
                }
            }
        },
        {
            id: 'hotel2',
            property: {
                propertyId: 'P2',
                title: 'Cheap Hotel',
                address: ['Test Address 2'],
                previewImage: {
                    url: '/test2.jpg',
                    caption: 'Test Caption 2',
                    imageType: 'PRIMARY'
                },
                rating: {
                    ratingValue: 3,
                    ratingType: 'self'
                }
            },
            offer: {
                name: 'Standard Room',
                displayPrice: {
                    amount: 200,
                    currency: 'AUD'
                },
                savings: {
                    amount: 50,
                    currency: 'AUD'
                },
                cancellationOption: {
                    cancellationType: 'NOT_REFUNDABLE'
                }
            }
        }
    ];

    it('renders hotel count correctly', () => {
        const { container } = render(<HotelList hotels={mockHotels} />);

        expect(screen.getByText('2')).toBeInTheDocument(); // 2 hotels
        expect(screen.getByText('hotels in')).toBeInTheDocument();
        expect(screen.getByText('Sydney')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('renders sort dropdown with default high-low value', () => {
        render(<HotelList hotels={mockHotels} />);

        const sortSelect = screen.getByTestId('sort-select');
        expect(sortSelect).toHaveValue('high-low');
    });

    it('sorts hotels high to low by default', () => {
        render(<HotelList hotels={mockHotels} />);

        const hotelCards = screen.getAllByTestId('hotel-card');
        expect(hotelCards).toHaveLength(2);

        // First card should be the expensive hotel
        expect(hotelCards[0].textContent).toBe('Expensive Hotel');

        // Second card should be the cheap hotel
        expect(hotelCards[1].textContent).toBe('Cheap Hotel');
    });

    it('sorts hotels low to high when sort option changes', () => {
        render(<HotelList hotels={mockHotels} />);

        // Change sort to low-high
        const sortSelect = screen.getByTestId('sort-select');
        fireEvent.change(sortSelect, { target: { value: 'low-high' } });

        const hotelCards = screen.getAllByTestId('hotel-card');

        // Order should be reversed now
        expect(hotelCards[0].textContent).toBe('Cheap Hotel');
        expect(hotelCards[1].textContent).toBe('Expensive Hotel');
    });

    it('renders empty state when no hotels are provided', () => {
        const { container } = render(<HotelList hotels={[]} />);

        expect(screen.getByText('No hotels found.')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
}); 