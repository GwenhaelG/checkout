/* ProductReviewPage

Purpose: to control how the product review page is displayed; 
initialise the product data by calling the API and 
simply passing it down to the sub-components for rendering

Usage: Use the styled css-grid components to control what is shown where and based on screen size

*/

import React, { useState, useEffect, useCallback } from 'react';
import client from '../api/client';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { ProductReviewsData } from '../types/types';

// Import sub components
import ProductName from '../components/Product/ProductName';
import ReviewForm from '../components/Product/ReviewForm';
import LatestReview from '../components/Product/LatestReview';
import ProductAverageRating from '../components/Product/ProductAverageRating';
import ProductRatingsHistogram from '../components/Product/ProductRatingsHistogram';

// Internal types
type ProductReviewPageProps = {
  productId: number;
  productTitle: string;
};

// Styles
const SGrid = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'header header header header'
    'main main main main';
`;

const Main = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'header header header header'
    'graph1 graph1 graph1 graph1'
    'graph2 graph2 graph2 graph2'
    'latest latest latest latest'
    'form form form form';

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      'header header header header'
      'graph1 graph1 graph2 graph2'
      'latest latest latest latest'
      'form form form form';
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      'header header header .'
      'latest latest latest graph1'
      'form form form graph2';
  }
`;

const SHeader = styled.div`
  grid-area: header;
  justify-self: center;
  width: 100%;
`;

const SGraph1 = styled.div`
  grid-area: graph1;
  margin: 10px;
`;

const SGraph2 = styled.div`
  grid-area: graph2;
  margin: 10px;
`;

const SLatest = styled.div`
  grid-area: latest;
  margin: 10px;
`;

const SForm = styled.div`
  grid-area: form;
  margin: 10px;
`;

const SMain = styled(Main)`
  grid-area: main;
  margin-bottom: 5vh;
`;

const ProductReviewPage = ({
  productId,
  productTitle,
}: ProductReviewPageProps) => {
  const [loading, setLoading] = useState(true); // Set to true when data loading from API. Set to false once call ended (success or failure)
  const [data, setData] = useState<ProductReviewsData | null>(); // Product review data
  const [error, setError] = useState(''); // Init error

  // Initialisation call to the API, which on success, setData to response; on error, skip setting the data.
  const handleInit = useCallback(async () => {
    try {
      // Call the API, get reviewsData to show
      const response = await client.get(`/product/${productId}/reviewsData`);
      if (response.status === 200 && response.data) {
        setData(response.data);
      } else {
        if (response.data?.message) {
          setError(response.data?.message);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error((err as Error).message);
    }
  }, [productId]);

  // Initialise the component
  useEffect(() => {
    if (loading) {
      handleInit();
    }
  }, [handleInit, loading]);

  return (
    <SGrid>
      <SHeader>
        <ProductName title={productTitle} />
      </SHeader>
      {loading ? (
        <Typography variant='body1' gutterBottom component='div'>
          Loading product data...
        </Typography>
      ) : data ? (
        <SMain>
          <SGraph1>
            <ProductAverageRating
              score={data.averageReviewsRating}
              monthlyData={data.monthlyData}
            />
          </SGraph1>
          <SGraph2>
            <ProductRatingsHistogram histogram={data.ratingsHistogram} />
          </SGraph2>
          <SForm>
            <ReviewForm productId={productId} submitCallback={handleInit} />
          </SForm>
          <SLatest>
            <LatestReview reviews={data.latestReviews} />
          </SLatest>
        </SMain>
      ) : (
        <Typography
          variant='body1'
          gutterBottom
          component='div'
          style={{ width: '100%' }}
        >
          {error}
        </Typography>
      )}
    </SGrid>
  );
};

export default ProductReviewPage;
