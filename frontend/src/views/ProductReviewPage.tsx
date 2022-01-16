import React, { useState, useEffect, useCallback } from 'react';
import client from '../api/client';
import styled from 'styled-components';
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
const Grid = styled.div`
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
    'form form form form'
    'latest latest latest latest';

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      'header header header header'
      'graph1 graph1 graph2 graph2'
      'form form form form'
      'latest latest latest latest';
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      'header header header .'
      'form form form graph1'
      'latest latest latest graph2';
  }
`;

const SHeader = styled.div`
  grid-area: header;
  justify-self: center;
`;

const SGraph1 = styled.div`
  grid-area: graph1;
`;

const SGraph2 = styled.div`
  grid-area: graph2;
`;

const SLatest = styled.div`
  grid-area: latest;
`;

const SForm = styled.div`
  grid-area: form;
`;

const SMain = styled(Main)`
  grid-area: main;
`;

// Main components
const ProductReviewPage = ({
  productId,
  productTitle,
}: ProductReviewPageProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProductReviewsData | null>();

  const handleInit = useCallback(async () => {
    try {
      const response = await client.get(`/product/${productId}/reviewsData`);
      if (response.status === 200 && response.data) {
        setData(response.data);
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

  console.log(data);

  return (
    <Grid>
      <SHeader>
        <ProductName title={productTitle} />
      </SHeader>
      <SMain>
        {loading && <p>Loading product data...</p>}
        {data && (
          <>
            <SGraph1>
              <ProductAverageRating score={data.averageReviewsRating} />
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
          </>
        )}
      </SMain>
    </Grid>
  );
};

export default ProductReviewPage;
