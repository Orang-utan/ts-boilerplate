import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/authUtil';

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const condition = isLoggedIn();

  return condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};
export default PrivateRoute;
