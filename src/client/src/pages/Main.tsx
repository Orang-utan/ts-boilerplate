import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ContentContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 80vw;
`;

const ButtonGroup = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  margin: 5px;
`;

const Main = () => {
  let history = useHistory();

  return (
    <ContentContainer>
      <h1 className="title is-1">Welcome to TS Boilerplate</h1>
      <p>
        Dead simple monorepo boilerplate web project designed to take you from
        Git Cloning to Heroku Deployment in less 5 minutes. 🚀🤩
      </p>
      <a href="https://github.com/Orang-utan/ts-boilerplate">
        Check out our Github
      </a>
      <ButtonGroup>
        <Button
          className="button is-primary"
          onClick={() => history.push('/signup')}
        >
          Sign Up
        </Button>
        <Button
          className="button is-secondary"
          onClick={() => history.push('/login')}
        >
          Login
        </Button>
      </ButtonGroup>
    </ContentContainer>
  );
};

export default Main;
