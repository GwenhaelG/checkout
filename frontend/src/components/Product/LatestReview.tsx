import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { ProductReview } from '../../types/types';

import Review from './Review';

interface LatestReviewProps extends React.ComponentPropsWithoutRef<'div'> {
  reviews: ProductReview[];
}

const SReviews = styled.div`
  padding: 10px;
  background-color: #f3f2f7;
  border-radius: 15px;
  height: 100%;
`;

const LatestReview = ({ reviews }: LatestReviewProps) => {
  return (
    <SReviews>
      <Typography
        variant='h6'
        gutterBottom
        component='div'
        style={{ justifyItems: 'left' }}
      >
        Latest reviews
      </Typography>
      {reviews.slice(0, 5).map((item, index) => (
        <Review review={item} key={index} />
      ))}
    </SReviews>
  );
};

export default LatestReview;
