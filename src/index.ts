import express from "express";
import path from "path";
import socket from "socket.io";
import mongoose from "mongoose";
import "./config";

const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port} 🚀`);
});

// setting up database
const uri: string | undefined = process.env.ATLAS_URI;

mongoose.connect(uri!, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully 👷‍♂️");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

const io = socket(server);

io.on("connect", (socket: socket.Socket) => {
  console.log("New client connected");

  socket.on("save", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
