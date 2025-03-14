import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortDropdown from '../SortDropdown';

describe('SortDropdown Component', () => {
    const mockOnSortChange = jest.fn();

    beforeEach(() => {
        mockOnSortChange.mockClear();
    });

    it('renders correctly with default props', () => {
        const { container } = render(
            <SortDropdown currentSort="high-low" onSortChange={mockOnSortChange} />
        );

        expect(screen.getByText('Sort by')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toHaveValue('high-low');
        expect(container).toMatchSnapshot();
    });

    it('shows both sorting options', () => {
        render(
            <SortDropdown currentSort="high-low" onSortChange={mockOnSortChange} />
        );

        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();

        // Check if options exist
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveValue('high-low');
        expect(options[1]).toHaveValue('low-high');
    });

    it('calls onSortChange when selection changes', () => {
        render(
            <SortDropdown currentSort="high-low" onSortChange={mockOnSortChange} />
        );

        const select = screen.getByRole('combobox');

        // Change selection to low-high
        fireEvent.change(select, { target: { value: 'low-high' } });

        expect(mockOnSortChange).toHaveBeenCalledTimes(1);
        expect(mockOnSortChange).toHaveBeenCalledWith('low-high');
    });

    it('renders with low-high selected correctly', () => {
        const { container } = render(
            <SortDropdown currentSort="low-high" onSortChange={mockOnSortChange} />
        );

        expect(screen.getByRole('combobox')).toHaveValue('low-high');
        expect(container).toMatchSnapshot();
    });
}); 