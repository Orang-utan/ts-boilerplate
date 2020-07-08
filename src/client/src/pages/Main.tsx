import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ENDPOINT = process.env.REACT_APP_API_URL || "";

const Main = () => {
  return (
    <div>
      <h1>Welcome to TS-boilerplate</h1>
    </div>
  );
};

export default Main;
