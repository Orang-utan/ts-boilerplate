import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  text-align: center;
  margin: 5%;
`;

const Dashboard = () => {
  return (
    <ContentContainer>
      <h1 className="title is-1">Welcome to Dashboard</h1>
    </ContentContainer>
  );
};

export default Dashboard;
