import * as React from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Button,
  TextField,
  Divider,
  Paper,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Main = () => {
  const [canvas, setCanvas] = React.useState([
    "Sunflower by Daniel",
    "Hello by Tom",
  ]);

  const [character, setCharacter] = React.useState("Bob");

  function handleSubmit() {
    console.log("Submit");
  }

  function getCharacter() {
    return "Bob";
  }

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
          {canvas.map((val) => {
            return (
              <Paper
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
                <Link to="/canvas" style={{ textDecoration: "none" }}>
                  <Typography variant="subtitle1" style={{ display: "inline" }}>
                    {val}
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
