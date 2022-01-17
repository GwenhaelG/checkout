/* LatestReview

Purpose: To display the latest reviews in back-chronolical order. 

Usage: Pass it a list of reviews in chronoligcal order, and it will represents them in a pre-defined
sized box to be scrolled as individual reviews.

Depends on: ProductReview component for displaying an individual review

*/

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

const SScroll = styled.div`
  max-height: 30vh;
  overflow-y: scroll;
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
      <SScroll>
        {[...reviews].reverse().map((item, index) => (
          <Review review={item} key={index} />
        ))}
      </SScroll>
    </SReviews>
  );
};

export default LatestReview;
