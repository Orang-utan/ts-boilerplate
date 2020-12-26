import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context';

const PublicRoute = (props) => {
  const auth = useContext(AuthContext);

  return auth.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

export default PublicRoute;
