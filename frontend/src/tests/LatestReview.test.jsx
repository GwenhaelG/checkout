import React from 'react';
import { render, screen } from '@testing-library/react';
import LatestReview from '../components/Product/LatestReview';
import axios from 'axios';

jest.mock('axios');

const latestReviews = [
  {
    authorName: 'Mr. T',
    authorEmail: 'mrt@gmail.com',
    comment: 'Super product!',
    rating: 5,
  },
  {
    authorName: 'Ms. R',
    authorEmail: 'mrt@gmail.com',
    rating: 4,
  },
  {
    authorName: 'Mrs. Q',
    authorEmail: 'mrt@gmail.com',
    comment: 'Super product!',
    rating: 5,
  },
  {
    authorName: 'Mr. A',
    authorEmail: 'mrt@gmail.com',
    rating: 1,
  },
  {
    authorName: 'Miss. B',
    authorEmail: 'mrt@gmail.com',
    comment: 'Super product!',
    rating: 4,
  },
];

describe('Latest reviews', () => {
  it('renders latest reviews', () => {
    render(<LatestReview reviews={latestReviews} />);
    expect(screen.getByText('Mrs. Q')).toBeInTheDocument();
  });

  it('fetches reviews from an API and displays them', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ status: 200, data: { latestReviews } })
    );

    render(<LatestReview reviews={latestReviews} />);

    const items = await screen.findAllByTestId('review');

    expect(items).toHaveLength(5);
  });
});
