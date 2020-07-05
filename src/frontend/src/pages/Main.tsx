import * as React from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Button,
  TextField,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";
import { ENDPOINT } from "../config";

type Canvas = {
  _id: string;
  name: string;
  creator: string;
};

const Main = () => {
  const [canvas, setCanvas] = React.useState([]);

  const [character, setCharacter] = React.useState("Bob");

  function handleSubmit() {
    console.log("Submit");
    // axios({
    //   url: `${ENDPOINT}/canvas`,
    //   method: "POST",
    //   timeout: 0,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: JSON.stringify({ name: "Hello", creator: "Dan" }),
    // });
  }

  function getCharacter() {
    return "Bob";
  }

  React.useEffect(() => {
    axios({
      url: `${ENDPOINT}/canvas`,
      method: "GET",
      timeout: 0,
    }).then((response) => {
      const {
        data: { result },
      } = response;

      setCanvas(result);
    });
  }, []);

  return (
    <div>
      <Typography variant="h3">TS-Canvas</Typography>
      <Typography variant="subtitle1">
        A collaborative online drawing canvas developed using TypeScript,
        Socket.io, and SSE's.
      </Typography>
      <Divider style={{ margin: "20px 0px" }} />
      <Typography variant="h4">Hey! Your character is {character}.</Typography>
      <Button
        style={{ display: "block", margin: "20px 0px" }}
        variant="contained"
        color="primary"
      >
        Generate New Character
      </Button>
      <Divider style={{ margin: "20px 0px" }} />
      <Typography variant="h4">Create New Canvas</Typography>
      <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
        <TextField
          style={{ display: "block", margin: "20px 0px" }}
          variant="outlined"
          label="Filename"
          size="small"
        />
        <Button
          style={{ display: "block", margin: "20px 0px" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Create New Canvas
        </Button>
        <Divider style={{ margin: "20px 0px" }} />
        <Typography variant="h4">Enter Existing Canvas</Typography>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {canvas.map((val: Canvas) => {
            return (
              <Paper
                key={val._id}
                style={{
                  display: "block",
                  margin: "20px 0px",
                  padding: "20px",
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <FavoriteIcon />
                </IconButton>
                <Link
                  to={`/canvas/${val._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="subtitle1" style={{ display: "inline" }}>
                    {val.name} by {val.creator}
                  </Typography>
                </Link>
              </Paper>
            );
          })}
        </ul>
      </form>
    </div>
  );
};

export default Main;
