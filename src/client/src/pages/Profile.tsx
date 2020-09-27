import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const FlexContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  margin: 5%;
`;

const Profile = () => {
  let history = useHistory();

  return (
    <FlexContainer>
      <Sidebar />
      <ContentContainer>
        <h3 className="title is-3">Profile Page</h3>
        <button
          className="button is-primary"
          onClick={() => history.push('/dashboard')}
        >
          Dashboard
        </button>
      </ContentContainer>
    </FlexContainer>
  );
};

export default Profile;
