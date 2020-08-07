import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  width: 100vw;
  height: 50px;
  padding: 0px 50px;
  display: flex;
  align-items: center;
  background-color: #2c3e50;
`;

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
  return (
    <div>
      <NavbarContainer>
        <a href="/" className="title is-6 has-text-white">
          🚀 TS-Boilerplate
        </a>
      </NavbarContainer>
      {children}
      <FooterContainer>
        <h1 className="has-text-grey-light">Made with ❤️ by DT</h1>
      </FooterContainer>
    </div>
  );
};

export default AppContainer;
