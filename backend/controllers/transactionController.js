const transactionModel = require("../models/transactionModel");

function getAllTransactions(req, res) {
  transactionModel.getAllTransactions(function (error, transactions) {
    if (error) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json(transactions);
  });
}

function getTransactionById(req, res) {
  const id = Number(req.params.id);

  transactionModel.getTransactionById(id, function (error, transaction) {
    if (error) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);
  });
}

function getTransactionsByMonth(req, res) {
  const month = req.params.month;

  transactionModel.getTransactionsByMonth(
    month,
    function (error, transactions) {
      if (error) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.json(transactions);
    },
  );
}

function getTransactionsByYear(req, res) {
  const year = req.params.year;

  transactionModel.getTransactionsByYear(year, function (error, transactions) {
    if (error) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json(transactions);
  });
}

function getTotalIncome(req, res) {
  transactionModel.getTotalIncome(function (error, result) {
    if (error) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json({
      totalIncome: result.totalIncome || 0,
    });
  });
}

function getTotalExpense(req, res) {
  transactionModel.getTotalExpense(function (error, result) {
    if (error) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json({
      totalExpense: result.totalExpense || 0,
    });
  });
}

function getBalance(req, res) {
  transactionModel.getBalance(function (error, result) {
    if (error) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json({
      balance: result.balance || 0,
    });
  });
}

function createTransaction(req, res) {
  const title = req.body.title;
  const amount = req.body.amount;
  const type = req.body.type;
  const date = req.body.date;

  if (!title || amount === undefined || !type || !date) {
    return res.status(400).json({
      message: "Title, amount, type and date are required",
    });
  }

  if (type !== "income" && type !== "expense") {
    return res.status(400).json({
      message: "Type must be income or expense",
    });
  }

  transactionModel.createTransaction(
    title,
    amount,
    type,
    date,
    function (error, newTransaction) {
      if (error) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      res.status(201).json(newTransaction);
    },
  );
}

function updateTransaction(req, res) {
  const id = Number(req.params.id);

  const title = req.body.title;
  const amount = req.body.amount;
  const type = req.body.type;
  const date = req.body.date;

  if (!title || amount === undefined || !type || !date) {
    return res.status(400).json({
      message: "Title, amount, type and date are required",
    });
  }

  if (type !== "income" && type !== "expense") {
    return res.status(400).json({
      message: "Type must be income or expense",
    });
  }

  transactionModel.updateTransaction(
    id,
    title,
    amount,
    type,
    date,
    function (error, updatedTransaction) {
      if (error) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (!updatedTransaction) {
        return res.status(404).json({
          message: "Transaction not found",
        });
      }

      res.json(updatedTransaction);
    },
  );
}

function deleteTransaction(req, res) {
  const id = Number(req.params.id);

  transactionModel.deleteTransaction(id, function (error, isDeleted) {
    if (error) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (!isDeleted) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction deleted successfully",
    });
  });
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  getTransactionsByMonth,
  getTransactionsByYear,
  getTotalIncome,
  getTotalExpense,
  getBalance,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
