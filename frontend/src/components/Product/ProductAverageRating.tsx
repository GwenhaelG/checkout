import { Rating } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const SAvRating = styled.div`
  margin: 10px;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'title'
    'star'
    'rating';
  border: 1px solid lightgrey;
  border-radius: 5px;
`;

const STitle = styled.div`
  grid-area: title;
  justify-self: center;
`;
const SStar = styled.div`
  grid-area: star;
`;
const SRating = styled.div`
  grid-area: rating;
`;

interface ProductAverageRatingProps
  extends React.ComponentPropsWithoutRef<'div'> {
  score: number;
}

const ProductAverageRating = ({ score }: ProductAverageRatingProps) => {
  return (
    <SAvRating>
      <STitle>
        <Typography
          variant='h6'
          gutterBottom
          component='div'
          style={{ justifyItems: 'left' }}
        >
          Average rating
        </Typography>
      </STitle>

      <SStar>
        <Rating value={score} precision={0.1} readOnly name='read-only' />
      </SStar>
      <SRating>{Math.round(score * 100) / 100} out of 5</SRating>
    </SAvRating>
  );
};

export default ProductAverageRating;
