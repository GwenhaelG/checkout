import React from 'react';
import styled from 'styled-components';

import { ProductReview } from '../../types/types';
import { Rating } from '@mui/material';

const SReview = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'name email rating'
    'comment comment comment';
  border: 1px solid lightgrey;
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
const SEmail = styled.div`
  grid-area: email;
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
      {review?.comment && <SComment>{review.comment}</SComment>}
      <SName>{review.authorName}</SName>
      <SEmail>{review.authorEmail}</SEmail>
      <SRating>
        <Rating name='read-only' value={review.rating} readOnly />
      </SRating>
    </SReview>
  );
};

export default Review;
