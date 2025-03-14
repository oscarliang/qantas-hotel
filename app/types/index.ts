export type HotelData = {
    results: Hotel[];
};

export type Hotel = {
    id: string;
    property: {
        propertyId: string;
        title: string;
        address: string[];
        previewImage: {
            url: string;
            caption: string;
            imageType: string;
        };
        rating: {
            ratingValue: number;
            ratingType: 'star' | 'self';
        };
    };
    offer: {
        promotion?: {
            title: string;
            type: string;
        };
        name: string;
        displayPrice: {
            amount: number;
            currency: string;
        };
        savings?: {
            amount: number;
            currency: string;
        } | null;
        cancellationOption: {
            cancellationType: 'FREE_CANCELLATION' | 'NOT_REFUNDABLE';
        };
    };
}; 