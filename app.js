const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server side" });
});

app.post("/", (req, res) => {
  res.send("You posted!");
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
