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
  const [fileName, setFileName] = React.useState("");
  const [character, setCharacter] = React.useState(getCharacter());

  React.useEffect(() => {
    const eventSource = new EventSource(`${ENDPOINT}/canvas/events`);

    eventSource.addEventListener("delete", (e) => {
      alert("All of the canvas are deleted!");
      fetchCanvas();
    });

    eventSource.addEventListener("add", (e) => {
      fetchCanvas();
    });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (fileName == "") {
      return;
    }

    axios({
      url: `${ENDPOINT}/canvas`,
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ name: fileName, creator: character }),
    }).then(() => {
      fetchCanvas();
    });

    e.preventDefault();
  }

  function getCharacter() {
    const nameArr = [
      "Annelle",
      "Sherril",
      "Ernie",
      "Quinn",
      "Zenaida",
      "Marget",
      "Olive",
      "Jamal",
      "Indira",
      "Bradly",
      "Corene",
      "Clarissa",
      "Michelle",
      "Azalee",
    ];

    return nameArr[Math.floor(Math.random() * (nameArr.length - 1))];
  }

  function handleNameChange() {
    setCharacter(getCharacter());
  }

  function handleFileName(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFileName(e.target.value);
  }

  function handleDelete() {
    axios({
      url: `${ENDPOINT}/canvas`,
      method: "DELETE",
      timeout: 0,
    }).then(() => {
      fetchCanvas();
    });
  }

  function fetchCanvas() {
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
  }

  React.useEffect(() => {
    fetchCanvas();
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
        onClick={handleNameChange}
      >
        Generate New Character
      </Button>
      <Divider style={{ margin: "20px 0px" }} />
      <Typography variant="h4">Create New Canvas</Typography>
      <form
        style={{ marginTop: "20px" }}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <TextField
          style={{ display: "block", margin: "20px 0px" }}
          variant="outlined"
          label="Filename"
          size="small"
          value={fileName}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => handleFileName(e)}
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
        <div style={{ display: "flex" }}>
          <Typography variant="h4">Edit Existing Canvas</Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "20px" }}
            onClick={handleDelete}
          >
            Delete All
          </Button>
        </div>
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
