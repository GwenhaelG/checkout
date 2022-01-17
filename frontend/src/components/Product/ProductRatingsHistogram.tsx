import React from 'react';
import styled from 'styled-components';

import { LinearProgress, Rating, Typography } from '@mui/material';

import { ratingsHistogram } from '../../types/types';

const SHistogram = styled.div`
  padding: 10px;
  background-color: #f3f2f7;
  border-radius: 15px;
  height: 100%;
`;

const STitle = styled.div`
  grid-area: title;
  justify-self: center;
  margin-bottom: 20px;
  width: 100%;
`;

const SRatingBar = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

interface ProductRatingsHistogramProps
  extends React.ComponentPropsWithoutRef<'div'> {
  histogram: ratingsHistogram;
}

const RatingBar = ({
  item,
  value,
  total,
}: {
  item: string;
  value: number;
  total: number;
}) => {
  return (
    <SRatingBar>
      <Rating value={+item} readOnly name='read-only' />
      <LinearProgress variant='determinate' value={value} />
      <p>
        {value} out of {total}
      </p>
    </SRatingBar>
  );
};

const ProductRatingsHistogram = ({
  histogram,
}: ProductRatingsHistogramProps) => {
  return (
    <SHistogram>
      <STitle>
        <Typography
          variant='h6'
          gutterBottom
          component='div'
          style={{ justifyItems: 'left' }}
        >
          Distribution of ratings
        </Typography>
      </STitle>
      {Object.keys(histogram).map((item, index) => (
        <RatingBar
          key={index}
          item={item}
          value={histogram[item]}
          total={Object.keys(histogram).reduce(
            (acc, cur) => acc + histogram[cur],
            0
          )}
        />
      ))}
    </SHistogram>
  );
};

export default ProductRatingsHistogram;
