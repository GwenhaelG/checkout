import React from 'react';
import styled from 'styled-components';

const SH2 = styled.h2`
  margin: 30px;
  padding: 40px 20px 40px 20px;
  color: black;
  background-color: #f3f2f7;
  border-radius: 15px;
`;

interface ProductNameProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
}

const ProductName = ({ title }: ProductNameProps) => {
  return <SH2>{title}</SH2>;
};

export default ProductName;
