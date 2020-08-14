import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ContentContainer = styled.div`
  text-align: center;
  margin: 5%;
`;

const User = () => {
  let history = useHistory();

  return (
    <ContentContainer>
      <h1>User Page</h1>
      <button
        className="button is-primary"
        onClick={() => history.push('/dashboard')}
      >
        Dashboard
      </button>
    </ContentContainer>
  );
};

export default User;
