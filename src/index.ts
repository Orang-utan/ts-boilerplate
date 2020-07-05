import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

const server = app.listen(port, () => {
  console.log(`Listening on port ${port} 🚀`);
});
