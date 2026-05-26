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

function getTotalIncome(req, res) {
  const totalIncome = transactionModel.getTotalIncome();

  res.json({
    totalIncome: totalIncome,
  });
}

function getTotalExpense(req, res) {
  const totalExpense = transactionModel.getTotalExpense();

  res.json({
    totalExpense: totalExpense,
  });
}

function getBalance(req, res) {
  const balance = transactionModel.getBalance();

  res.json({
    balance: balance,
  });
}

function createTransaction(req, res) {
  const title = req.body.title;
  const amount = req.body.amount;
  const type = req.body.type;
  const date = req.body.date;

  if (!title || !amount || !type || !date) {
    return res.status(400).json({
      message: "Title, amount, type and date are required",
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
    date,
  );

  res.status(201).json(newTransaction);
}

function getTransactionsByMonth(req, res) {
  const month = req.params.month;

  const transactions = transactionModel.getTransactionsByMonth(month);

  res.json(transactions);
}

function getTransactionsByYear(req, res) {
  const year = req.params.year;

  const transactions = transactionModel.getTransactionsByYear(year);

  res.json(transactions);
}

function updateTransaction(req, res) {
  const id = Number(req.params.id);

  const title = req.body.title;
  const amount = req.body.amount;
  const type = req.body.type;
  const date = req.body.date;

  if (!title || !amount || !type || !date) {
    return res.status(400).json({
      message: "Title, amount, type and date are required",
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
    date,
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
  getTotalIncome,
  getTotalExpense,
  getBalance,
  getTransactionsByMonth,
  getTransactionsByYear,
};
