const transactionModel = require("../models/transactionModel");

function getAllTransactions(req, res) {
  const transactions = transactionModel.getAllTransactions();

  res.json(transactions);
}

function getTransactionById(req, res) {
  const id = Number(req.params.id);

  const transaction = transactionModel.getTransactionById(id);

  if (!transaction) {
    return res.status(404).json({
      message: "Transaction not found",
    });
  }

  res.json(transaction);
}

function createTransaction(req, res) {
  const title = req.body.title;
  const amount = req.body.amount;
  const type = req.body.type;

  if (!title || !amount || !type) {
    return res.status(400).json({
      message: "Title, amount and type are required",
    });
  }

  if (type !== "income" && type !== "expense") {
    return res.status(400).json({
      message: "Type must be income or expense",
    });
  }

  const newTransaction = transactionModel.createTransaction(
    title,
    amount,
    type,
  );

  res.status(201).json(newTransaction);
}

function updateTransaction(req, res) {
  const id = Number(req.params.id);

  const title = req.body.title;
  const amount = req.body.amount;
  const type = req.body.type;

  if (!title || !amount || !type) {
    return res.status(400).json({
      message: "Title, amount and type are required",
    });
  }

  if (type !== "income" && type !== "expense") {
    return res.status(400).json({
      message: "Type must be income or expense",
    });
  }

  const updatedTransaction = transactionModel.updateTransaction(
    id,
    title,
    amount,
    type,
  );

  if (!updatedTransaction) {
    return res.status(404).json({
      message: "Transaction not found",
    });
  }

  res.json(updatedTransaction);
}

function deleteTransaction(req, res) {
  const id = Number(req.params.id);

  const isDeleted = transactionModel.deleteTransaction(id);

  if (!isDeleted) {
    return res.status(404).json({
      message: "Transaction not found",
    });
  }

  res.json({
    message: "Transaction deleted successfully",
  });
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
