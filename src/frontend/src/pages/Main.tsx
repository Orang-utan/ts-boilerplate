import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const Main = () => {
  return (
    <div>
      <Typography variant="h2">TS-Canvas</Typography>
      <Typography variant="subtitle1">
        A collaborative online drawing canvas developed using TypeScript,
        Socket.io, and SSE's.
      </Typography>
      <Button variant="contained">Create New Canvas</Button>
    </div>
  );
};

export default Main;
