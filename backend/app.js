const express = require("express");
const cors = require("cors");
require("./config/database");

const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

app.get("/", function (req, res) {
  res.send("Budget Manager API is working");
});

const PORT = 3000;

app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});
