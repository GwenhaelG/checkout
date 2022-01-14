import React from 'react';
import { Typography, Grid } from '@mui/material';
import Form from '../components/form';

const Home = () => {
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
          style={{ marginBottom: '5vh' }}
        >
          Appear Here interview
        </Typography>
      </Grid>
      <Grid container justifyContent='center'>
        <Form />
      </Grid>
    </>
  );
};

export default Home;
