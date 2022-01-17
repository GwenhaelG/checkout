import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductRatingsHistogram from '../components/Product/ProductRatingsHistogram';

const histogram = {
  0: 0,
  1: 1,
  2: 0,
  3: 0,
  4: 10,
  5: 15,
};

it('renders ratings histogram', () => {
  render(<ProductRatingsHistogram histogram={histogram} />);
  expect(screen.getByText('Distribution of ratings')).toBeInTheDocument();
});
