import express from "express";
import path from "path";
import socket from "socket.io";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Canvas } from "./models/canvas.model";
import canvasRouter from "./routes/canvas.route";
import cors from "cors";
import "./utils/config";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/canvas", canvasRouter);

const port = process.env.PORT || 5000;

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
  console.log("MongoDB database connection established succesfully!");
});

if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, "frontend", "build");

  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}

const io = socket(server);

io.on("connect", (socket: socket.Socket) => {
  console.log("New client connected");

  socket.on("loadHistory", (canvasId) => {
    Canvas.findById(canvasId).then(async (canvas: any) => {
      socket.emit("historySent", canvas.canvasSaved);
    });
  });

  socket.on("save", ({ image, canvasId }) => {
    Canvas.findById(canvasId).then(async (canvas: any) => {
      canvas.canvasSaved = image;

      await canvas.save();
    });
  });

  socket.on("freeDraw", ({ start, end, canvasId }) => {
    io.sockets.emit("freeDrawAll", { start, end, canvasId });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
