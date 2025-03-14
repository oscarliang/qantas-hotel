import React from 'react';
import { render } from '@testing-library/react';
import { StarIcon, CircleIcon } from '../Icons';

describe('Icons Component', () => {
  describe('StarIcon', () => {
    it('renders filled star correctly', () => {
      const { container } = render(<StarIcon filled={true} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('fill');
      expect(container).toMatchSnapshot();
    });

    it('renders empty star correctly', () => {
      const { container } = render(<StarIcon filled={false} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('fill', 'none');
      expect(container).toMatchSnapshot();
    });
  });

  describe('CircleIcon', () => {
    it('renders filled circle correctly', () => {
      const { container } = render(<CircleIcon filled={true} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('fill');
      expect(container).toMatchSnapshot();
    });

    it('renders empty circle correctly', () => {
      const { container } = render(<CircleIcon filled={false} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('fill', 'none');
      expect(container).toMatchSnapshot();
    });
  });
});
