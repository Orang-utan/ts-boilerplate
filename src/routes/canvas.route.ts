import express from "express";
import events from "events";
import { Canvas } from "../models/canvas.model";

const router = express.Router();
const eventEmitter = new events.EventEmitter();

// sse delete notification
router.get("/events", (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  function deleteListener() {
    res.write("event: delete\n");
    res.write("data: Delete event notification!\n\n");
  }

  function addListener() {
    res.write("event: add\n");
    res.write("data: Add event notification!\n\n");
  }

  // Listens for 'event' and sends an 'Event triggered!' message to client when its heard.
  eventEmitter.addListener("delete", deleteListener);
  eventEmitter.addListener("add", addListener);

  req.on("close", () => {
    eventEmitter.removeAllListeners();
    res.end();
    console.log("Stop sending events since client closed connection.");
  });
});

// create new canvas
router.post("/", (req, res) => {
  eventEmitter.emit("add");
  const creator = req.body.creator;
  const name = req.body.name;

  const newCanvas = new Canvas({
    creator,
    name,
  });

  newCanvas
    .save()
    .then((data) => {
      return res.status(200).json({ message: "success", canvas: data });
    })
    .catch((e) => {
      return res.status(500).json({ error: e });
    });
});

// get all canvas
router.get("/", (_, res) => {
  Canvas.find({})
    .select("-canvasSaved")
    .then((result) => {
      return res.status(200).json({ message: "success", result: result });
    })
    .catch((e) => {
      return res.status(500).json({ error: e });
    });
});

// delete all canvas
router.delete("/", (_, res) => {
  eventEmitter.emit("delete");

  Canvas.deleteMany({})
    .then(() => {
      return res.status(200).json({ message: "success" });
    })
    .catch((e) => {
      return res.status(500).json({ error: e });
    });
});

export default router;
