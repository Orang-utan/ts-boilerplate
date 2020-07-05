import express from "express";
import { Canvas } from "../models/canvas.model";

const router = express.Router();

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
  Canvas.find({}, (e, result) => {
    if (e) {
      return res.status(500).json({ error: e });
    } else {
      return res.status(200).json({ message: "success", result: result });
    }
  });
});

export default router;
