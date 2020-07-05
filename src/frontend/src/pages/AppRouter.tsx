import React from "react";
import Canvas from "./Canvas";
import Main from "./Main";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const AppRouter = () => {
  return (
    <Container maxWidth="sm">
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/canvas" exact component={Canvas} />
        </Switch>
      </Router>
    </Container>
  );
};

export default AppRouter;
