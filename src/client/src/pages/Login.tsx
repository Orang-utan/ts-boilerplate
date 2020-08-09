import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, FieldAttributes } from 'formik';
import { login } from '../api/userApi';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const FormContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 40vw;
`;

const Button = styled.button`
  width: 100%;
`;

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  success: boolean;
}

const initialValues = {
  email: '',
  password: '',
};

const FieldWrapper = ({
  children,
  icon,
}: {
  children: FieldAttributes<any>;
  icon?: string;
}) => {
  if (!icon) return children;

  return (
    <div className="field">
      <p className="control has-icons-left has-icons-right">
        {children}
        <span className="icon is-small is-left">
          <i className={`fas ${icon}`}></i>
        </span>
      </p>
    </div>
  );
};

const Login = () => {
  const [loginMutate] = useMutation(login);
  const { authActions } = useContext(AuthContext);

  let history = useHistory();

  const handleSubmit = async (values: LoginParams) => {
    try {
      const { accessToken, refreshToken } = (await loginMutate(
        values
      )) as LoginResponse;

      authActions.setAccessToken(accessToken);
      authActions.setRefreshToken(refreshToken);
      authActions.setLoggedIn(true);

      history.push('/dashboard');
    } catch (error) {
      alert('Login Error');
    }
  };

  return (
    <FormContainer>
      <h1 className="title is-1">Welcome Back</h1>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <FieldWrapper icon="fa-envelope">
            <Field
              name="email"
              className="input"
              type="email"
              placeholder="Email"
            />
          </FieldWrapper>
          <FieldWrapper icon="fa-lock">
            <Field
              name="password"
              className="input"
              type="password"
              placeholder="Password"
            />
          </FieldWrapper>
          <Button className="button is-primary" type="submit">
            Sign in
          </Button>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default Login;
