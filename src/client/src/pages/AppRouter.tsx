import React from 'react';
import Main from './Main';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import AppContainer from '../components/AppContainer';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import { AuthContextProvider } from '../components/AuthContext';

import { BrowserRouter as Router, Switch } from 'react-router-dom';

const AppRouter = () => {
  return (
    <AuthContextProvider>
      <Router>
        <AppContainer>
          <Switch>
            <PublicRoute exact path="/" component={Main} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PublicRoute exact={false} path="/" component={Main} />
          </Switch>
        </AppContainer>
      </Router>
    </AuthContextProvider>
  );
};

export default AppRouter;
