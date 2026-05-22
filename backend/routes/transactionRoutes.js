const express = require("express");

const router = express.Router();

let transactions = [
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
  {
    id: 3,
    title: "Internet bill",
    amount: 80,
    type: "expense",
  },
];

router.get("/", function (req, res) {
  res.json(transactions);
});

router.get("/:id", function (req, res) {
  const id = Number(req.params.id);

  const transaction = transactions.find(function (transaction) {
    return transaction.id === id;
  });

  if (!transaction) {
    return res.status(404).json({
      message: "Transaction not found",
    });
  }

  res.json(transaction);
});

router.post("/", function (req, res) {
  const title = req.body.title;
  const amount = req.body.amount;
  const type = req.body.type;

  if (!title || amount === undefined || !type) {
    return res.status(400).json({
      message: "Title, amount and type are required",
    });
  }

  if (type !== "income" && type !== "expense") {
    return res.status(400).json({
      message: "Type must be income or expense",
    });
  }

  const newTransaction = {
    id: Date.now(),
    title: title,
    amount: Number(amount),
    type: type,
  };

  transactions.push(newTransaction);

  res.status(201).json(newTransaction);
});

router.delete("/:id", function (req, res) {
  const id = Number(req.params.id);

  const transactionExists = transactions.some(function (transaction) {
    return transaction.id === id;
  });

  if (!transactionExists) {
    return res.status(404).json({
      message: "Transaction not found",
    });
  }

  transactions = transactions.filter(function (transaction) {
    return transaction.id !== id;
  });

  res.json({
    message: "Transaction deleted successfully",
  });
});

module.exports = router;
