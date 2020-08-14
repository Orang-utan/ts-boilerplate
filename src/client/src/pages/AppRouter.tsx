import React from 'react';
import Main from './Main';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import User from './User';
import AppContainer from '../components/AppContainer';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

import { BrowserRouter as Router, Switch } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <AppContainer>
        <Switch>
          <PublicRoute exact path="/" component={Main} />
          <PublicRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/user" component={User} />
          <PublicRoute exact={false} path="/" component={Main} />
        </Switch>
      </AppContainer>
    </Router>
  );
};

export default AppRouter;
