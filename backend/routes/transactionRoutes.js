const express = require("express");

const router = express.Router();

const transactions = [
  {
    id: 1,
    title: "Salary",
    amount: 4000,
    type: "income",
  },
  {
    id: 2,
    title: "Groceries",
    amount: 150,
    type: "expense",
  },
];

router.get("/", function (req, res) {
  res.json(transactions);
});

module.exports = router;
