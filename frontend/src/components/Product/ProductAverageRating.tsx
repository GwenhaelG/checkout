import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Rating } from '@mui/material';
import ProductAverageRatingsOverTime from './ProductAverageRatingsOverTime';

const SAvRating = styled.div`
  background-color: #f3f2f7;
  border-radius: 15px;
  padding: 10px;
  display: grid;
  height: 100%;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'title'
    'star'
    'rating';
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

interface MonthlyData {
  month: string;
  value: number;
}

interface ProductAverageRatingProps
  extends React.ComponentPropsWithoutRef<'div'> {
  score: number;
  monthlyData: MonthlyData[];
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const ProductAverageRating = ({
  score,
  monthlyData,
}: ProductAverageRatingProps) => {
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
      {useWindowDimensions().width > 400 && (
        <ProductAverageRatingsOverTime monthlyData={monthlyData} />
      )}
    </SAvRating>
  );
};

export default ProductAverageRating;
