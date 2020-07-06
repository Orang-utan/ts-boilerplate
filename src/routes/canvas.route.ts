import express from "express";
import { Canvas } from "../models/canvas.model";

const router = express.Router();

// sse delete notification
router.get("/events", (_, res) => {
  console.log("request received");
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  setInterval(async () => {
    res.write("event: ping\n"); // added these
    res.write(`data: ${JSON.stringify({ hasUnread: true })}`);
    res.write("\n\n");
  }, 5000);
});

// create new canvas
router.post("/", (req, res) => {
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
  Canvas.remove({})
    .then(() => {
      return res.status(200).json({ message: "success" });
    })
    .catch((e) => {
      return res.status(500).json({ error: e });
    });
});

export default router;
