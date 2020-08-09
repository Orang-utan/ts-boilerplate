import * as React from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, FieldAttributes } from 'formik';
import { signup } from '../api/userApi';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

const FormContainer = styled.div`
  text-align: center;
  margin: 10vh auto;
  width: 40vw;
`;

const Button = styled.button`
  width: 100%;
`;

interface SignupParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialValues = {
  firstName: '',
  lastName: '',
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

const Signup = () => {
  const [signupMutate] = useMutation(signup);
  let history = useHistory();

  const handleSubmit = async (values: SignupParams) => {
    try {
      await signupMutate(values);
      alert('Success');
      history.push('/login');
    } catch (error) {
      alert('Error');
      console.log(error.response.data);
    }
  };

  return (
    <FormContainer>
      <h1 className="title is-1">Sign Up</h1>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <FieldWrapper icon="fa-signature">
            <Field
              name="firstName"
              className="input"
              type="text"
              placeholder="First Name"
            />
          </FieldWrapper>
          <FieldWrapper icon="fa-signature">
            <Field
              name="lastName"
              className="input"
              type="text"
              placeholder="Last Name"
            />
          </FieldWrapper>
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
            Create Account
          </Button>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default Signup;
