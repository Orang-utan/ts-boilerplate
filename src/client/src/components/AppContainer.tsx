import React from 'react';
import styled from 'styled-components';
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
