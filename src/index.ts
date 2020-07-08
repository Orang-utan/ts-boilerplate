import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import cors from "cors";
import "./utils/config";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port} 🚀`);
});

// setting up database
const uri: string | undefined = process.env.ATLAS_URI;

if (uri === undefined) {
  throw ".env file error: ATLAS_URI not configured";
}

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
  const root = path.join(__dirname, "client", "build");

  app.use(express.static(root));
  app.get("*", (_, res) => {
    res.sendFile("index.html", { root });
  });
}
