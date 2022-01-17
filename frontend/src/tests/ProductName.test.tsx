import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductName from '../components/Product/ProductName';

it('renders Product Name', () => {
  render(<ProductName title={'Super Awesome Product'} />);
  expect(screen.getByText('Super Awesome Product')).toBeInTheDocument();
});
