import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context';
import FormField from '../../components/FormField';

function LoginPage() {
  const auth = useContext(AuthContext);

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  async function handleSubmit({ email, password }, actions) {
    try {
      await auth.login(email, password);
    } catch (error) {
      const message =
        error.response.status === 400
          ? error.response.data.message
          : 'An unknown error occurred.';
      actions.setFieldError('email', message);
      actions.setFieldError('password', message);
    }
  }

  return (
    <div className="container">
      <h1 className="title mt-4">Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <FormField
              name="email"
              type="email"
              label="Email"
              errors={errors}
            />
            <FormField
              name="password"
              type="password"
              label="Password"
              errors={errors}
            />
            <button
              type="submit"
              className="button is-link"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginPage;
