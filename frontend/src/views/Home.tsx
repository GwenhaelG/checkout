import React from 'react';
import { Typography, Grid } from '@mui/material';

import ProductReviewPage from './ProductReviewPage';

const Review = () => {
  return (
    <>
      <Grid
        container
        style={{ marginTop: '5vh', marginBottom: '10vh' }}
        justifyContent='center'
      >
        <Typography
          variant='h4'
          gutterBottom
          component='div'
          style={{ marginBottom: '2vh', padding: '20px' }}
        >
          Checkout.com interview
        </Typography>
      </Grid>
      <Grid container>
        <ProductReviewPage
          productId={1}
          productTitle={'Super Awesome Product'}
        />
      </Grid>
    </>
  );
};

export default Review;
