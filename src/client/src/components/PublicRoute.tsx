import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../api/auth';

const PublicRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const condition = auth.isAuthenticated();

  return condition ? (
    <Redirect to="/dashboard" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};
export default PublicRoute;
