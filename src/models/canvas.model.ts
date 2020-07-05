import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CanvasSchema = new Schema({
  creator: { type: String, required: true },
  name: { type: String, required: true },
  canvasSaved: { type: String, default: "" },
});

const Canvas = mongoose.model("Canvas", CanvasSchema);

export { Canvas };
