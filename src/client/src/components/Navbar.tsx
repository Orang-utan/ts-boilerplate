import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const NavbarContainer = styled.div`
  width: 100vw;
  height: 50px;
  padding: 0px 50px;
  display: flex;
  align-items: center;
  background-color: #2c3e50;
  justify-content: space-between;
`;

const NavbarItem = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Navbar = () => {
  const { authState, authActions } = useContext(AuthContext);
  let history = useHistory();

  const logout = () => {
    authActions.setAccessToken('');
    authActions.setRefreshToken('');
    authActions.setLoggedIn(false);

    history.push('/');
  };

  return (
    <NavbarContainer>
      <NavbarItem>
        <a href="/" className="title is-6 has-text-white">
          🚀 TS-Boilerplate
        </a>
      </NavbarItem>
      <NavbarItem>
        {authState.loggedIn && (
          <h1 className="title is-6 has-text-white" onClick={logout}>
            Logout
          </h1>
        )}
      </NavbarItem>
    </NavbarContainer>
  );
};

export default Navbar;
