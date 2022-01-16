import React from 'react';
import styled from 'styled-components';

const SH2 = styled.h2`
  margin: 30px;
  padding: 10px 5px 10px 5px;
  color: black;
`;

interface ProductNameProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
}

const ProductName = ({ title }: ProductNameProps) => {
  return <SH2>{title}</SH2>;
};

export default ProductName;
