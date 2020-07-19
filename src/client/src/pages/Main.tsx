import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  text-align: center;
  margin: 5%;
`;

const Main = () => {
  return (
    <ContentContainer>
      <h1>Welcome to TS Boilerplate</h1>
      <a href="https://github.com/Orang-utan/ts-boilerplate">
        Check out our Github
      </a>
    </ContentContainer>
  );
};

export default Main;
