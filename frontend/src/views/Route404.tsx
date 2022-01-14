import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SContainer = styled.div`
  background-color: ${({ theme }) => theme.layout.background.default};
  padding-top: 10px;
  text-align: center;
`;

const Route404 = () => {
  return (
    <SContainer>
      <h2>Wrong turn</h2>
      <p>
        You took a wrong turn. Turn around to the <Link to='/'>home page</Link>
      </p>
    </SContainer>
  );
};

export default Route404;
