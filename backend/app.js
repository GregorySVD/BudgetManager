const express = require("express");

const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(express.json());

app.use("/api/transactions", transactionRoutes);

app.get("/", function (req, res) {
  res.send("Budget Manager API is working");
});

const PORT = 3000;

app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});
