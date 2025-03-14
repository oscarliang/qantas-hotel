import React from 'react';
import { render, screen } from '@testing-library/react';
import HotelCard from '../HotelCard';

// Mock the Icons component
jest.mock('../Icons', () => ({
    StarIcon: ({ filled }: { filled: boolean }) => (
        <span data-testid={`star-icon-${filled ? 'filled' : 'empty'}`}>★</span>
    ),
    CircleIcon: ({ filled }: { filled: boolean }) => (
        <span data-testid={`circle-icon-${filled ? 'filled' : 'empty'}`}>○</span>
    ),
}));

describe('HotelCard Component', () => {
    const defaultProps = {
        id: 'test-id',
        propertyId: 'P12345',
        title: 'Test Hotel',
        address: ['123 Test St', 'Test City'],
        imageUrl: '/test-image.jpg',
        imageCaption: 'Test Hotel Image',
        rating: {
            ratingValue: 4.5,
            ratingType: 'star' as const,
        },
        roomName: 'Deluxe Room',
        price: {
            amount: 199.99,
            currency: 'AUD',
        },
        savings: {
            amount: 20,
            currency: 'AUD',
        },
        cancellationType: 'FREE_CANCELLATION' as const,
    };

    it('renders hotel details correctly', () => {
        const { container } = render(<HotelCard {...defaultProps} />);

        expect(screen.getByText('Test Hotel')).toBeInTheDocument();
        expect(screen.getByText('123 Test St, Test City')).toBeInTheDocument();
        expect(screen.getByText('Deluxe Room')).toBeInTheDocument();
        expect(screen.getByText(/\$\s*\d+/)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('renders star rating correctly', () => {
        render(<HotelCard {...defaultProps} />);

        // There should be 4 filled stars and 1 half star for a 4.5 rating
        const filledIcons = screen.getAllByTestId('star-icon-filled');
        expect(filledIcons).toHaveLength(4);

        const emptyIcons = screen.getAllByTestId('star-icon-empty');
        expect(emptyIcons).toHaveLength(1);
    });

    it('renders circle rating when type is self', () => {
        render(
            <HotelCard
                {...defaultProps}
                rating={{
                    ratingValue: 4,
                    ratingType: 'self'
                }}
            />
        );

        // Should render circle icons instead of stars
        const filledIcons = screen.getAllByTestId('circle-icon-filled');
        expect(filledIcons).toHaveLength(4);

        const emptyIcons = screen.getAllByTestId('circle-icon-empty');
        expect(emptyIcons).toHaveLength(1);
    });

    it('shows free cancellation when available', () => {
        render(<HotelCard {...defaultProps} />);

        expect(screen.getByText('Free cancellation')).toBeInTheDocument();
    });

    it('does not show free cancellation when not available', () => {
        render(
            <HotelCard
                {...defaultProps}
                cancellationType="NOT_REFUNDABLE"
            />
        );

        expect(screen.queryByText('Free cancellation')).not.toBeInTheDocument();
    });

    it('shows savings when available', () => {
        render(<HotelCard {...defaultProps} />);

        expect(screen.getByText(/Save \$20.*/)).toBeInTheDocument();
    });

    it('does not show savings when null', () => {
        render(
            <HotelCard
                {...defaultProps}
                savings={null}
            />
        );

        expect(screen.queryByText(/Save/)).not.toBeInTheDocument();
    });

    it('shows promotion tag when available', () => {
        render(
            <HotelCard
                {...defaultProps}
                promotion={{
                    title: 'Special Offer',
                    type: 'MEMBER'
                }}
            />
        );

        expect(screen.getByText('Special Offer')).toBeInTheDocument();
    });
}); 