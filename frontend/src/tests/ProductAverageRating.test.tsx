import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductAverageRating from '../components/Product/ProductAverageRating';

const averageReviewsRating = 4.5;
const monthlyData = [
  { month: 'Sep-21', value: 3.2 },
  { month: 'Oct-21', value: 3.4 },
  { month: 'Nov-21', value: 4.1 },
  { month: 'Dec-21', value: 4.5 },
];

it('renders average ratings', () => {
  render(
    <ProductAverageRating
      score={averageReviewsRating}
      monthlyData={monthlyData}
    />
  );
  expect(screen.getByText('4.5 out of 5')).toBeInTheDocument();
});
