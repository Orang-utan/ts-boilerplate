import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import auth from '../api/auth';

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
  let history = useHistory();
  const [loggedIn, setLoggedIn] = useState(auth.isAuthenticated());

  const logout = ({ loggedIn }: { loggedIn: boolean }) => {
    history.push('/');
    setLoggedIn(loggedIn);
  };

  const login = ({ loggedIn }: { loggedIn: boolean }) => {
    setLoggedIn(loggedIn);
  };

  auth.addLoginSubscribers(login);
  auth.addLogoutSubscribers(logout);

  return (
    <NavbarContainer>
      <NavbarItem>
        <a href="/" className="title is-6 has-text-white">
          🚀 TS-Boilerplate
        </a>
      </NavbarItem>
      <NavbarItem>
        {loggedIn && (
          <h1
            className="title is-6 has-text-white"
            onClick={() => auth.logout()}
          >
            Logout
          </h1>
        )}
      </NavbarItem>
    </NavbarContainer>
  );
};

export default Navbar;
