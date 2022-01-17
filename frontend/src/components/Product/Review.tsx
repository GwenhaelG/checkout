import React from 'react';
import styled from 'styled-components';

import { ProductReview } from '../../types/types';
import { Rating } from '@mui/material';

const SReview = styled.div`
  margin: 10px;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'name comment comment'
    'rating comment comment';
  background-color: white;
  border-radius: 5px;
`;

const SComment = styled.div`
  grid-area: comment;
  padding: 20px;
  justify-self: center;
`;
const SName = styled.div`
  grid-area: name;
`;

const SRating = styled.div`
  grid-area: rating;
`;

type ReviewProps = {
  review: ProductReview;
};

const Review = ({ review }: ReviewProps) => {
  return (
    <SReview>
      {review?.comment && <SComment>"{review.comment}"</SComment>}
      <SName>{review.authorName}</SName>
      <SRating>
        <Rating name='read-only' value={review.rating} readOnly />
      </SRating>
    </SReview>
  );
};

export default Review;
