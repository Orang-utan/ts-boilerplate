import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';

const FooterContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: #ecf0f1;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const AppContainer = ({ children }: { children: any }) => {
  const { authState, authActions } = useContext(AuthContext);
  let history = useHistory();

  const logout = () => {
    authActions.setLoggedIn(false);
    authActions.setAccessToken('');
    authActions.setRefreshToken('');

    history.push('/');
  };

  return (
    <div>
      <Navbar />
      {children}
      <FooterContainer>
        <h1 className="has-text-grey-light">Made with ❤️ by DT</h1>
      </FooterContainer>
    </div>
  );
};

export default AppContainer;
