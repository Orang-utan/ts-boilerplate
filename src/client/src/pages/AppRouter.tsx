import React from 'react';
import Main from './Main';
import Signup from './Signup';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
