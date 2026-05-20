const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("Budget Manager is working");
});

const PORT = 3000;

app.listen(PORT, function () {
  console.log("Serwer działa na porcie " + PORT);
});
