import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/index';

const PublicRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const condition = isLoggedIn();

  return condition ? (
    <Redirect to="/dashboard" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};
export default PublicRoute;
