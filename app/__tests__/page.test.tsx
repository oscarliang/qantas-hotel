import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../page';
import { getHotelData } from '../services/hotelData';

// Mock the services and components
jest.mock('../services/hotelData', () => ({
    getHotelData: jest.fn(),
}));

jest.mock('../components/HotelList', () => {
    return jest.fn(({ hotels }) => (
        <div data-testid="hotel-list">
            {hotels.length} hotels
        </div>
    ));
});

jest.mock('next/image', () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: (props: any) => {
        // Filter out any boolean props to avoid React warnings
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { priority, ...filteredProps } = props;
        return <img {...filteredProps} />;
    },
}));

describe('Home Page', () => {
    const mockHotelData = {
        results: [
            {
                id: 'test1',
                property: {
                    propertyId: 'P1',
                    title: 'Test Hotel 1',
                    address: ['Address 1'],
                    previewImage: {
                        url: '/test1.jpg',
                        caption: 'Test Caption 1',
                        imageType: 'PRIMARY'
                    },
                    rating: {
                        ratingValue: 4,
                        ratingType: 'star'
                    }
                },
                offer: {
                    name: 'Test Room',
                    displayPrice: {
                        amount: 300,
                        currency: 'AUD'
                    },
                    savings: null,
                    cancellationOption: {
                        cancellationType: 'FREE_CANCELLATION'
                    }
                }
            }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (getHotelData as jest.Mock).mockReturnValue(mockHotelData);
    });

    it('renders the hotel list after loading', async () => {
        const { container } = render(<Home />);

        // Directly verify the hotel list is present (skipping loader check)
        await waitFor(() => {
            expect(screen.getByTestId('hotel-list')).toBeInTheDocument();
        });

        expect(screen.getByText('1 hotels')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('renders the Qantas logo', async () => {
        render(<Home />);

        const logo = screen.getByAltText('Qantas Logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/qantas-logo.png');
    });

    it('renders the footer with current year', async () => {
        render(<Home />);

        const currentYear = new Date().getFullYear();
        const footerText = screen.getByText(new RegExp(`© ${currentYear} Qantas Airways Limited`));
        expect(footerText).toBeInTheDocument();
    });

    it('handles error when fetching hotel data fails', async () => {
        console.error = jest.fn(); // Mock console.error
        (getHotelData as jest.Mock).mockImplementation(() => {
            throw new Error('Failed to fetch data');
        });

        render(<Home />);

        // Directly verify the hotel list is present (skipping loader check)
        await waitFor(() => {
            expect(screen.getByTestId('hotel-list')).toBeInTheDocument();
        });

        // Should still render the hotel list component but with 0 hotels
        expect(screen.getByText('0 hotels')).toBeInTheDocument();
        expect(console.error).toHaveBeenCalled();
    });
}); 