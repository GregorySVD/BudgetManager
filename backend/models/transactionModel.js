const db = require("../config/database");

function getAllTransactions(callback) {
  const sql = "SELECT * FROM transactions";

  db.all(sql, [], function (error, rows) {
    callback(error, rows);
  });
}

function getTransactionById(id, callback) {
  const sql = "SELECT * FROM transactions WHERE id = ?";

  db.get(sql, [id], function (error, row) {
    callback(error, row);
  });
}

function getTransactionsByMonth(month, callback) {
  const sql = "SELECT * FROM transactions WHERE date LIKE ?";

  db.all(sql, [month + "%"], function (error, rows) {
    callback(error, rows);
  });
}

function getTransactionsByYear(year, callback) {
  const sql = "SELECT * FROM transactions WHERE date LIKE ?";

  db.all(sql, [year + "%"], function (error, rows) {
    callback(error, rows);
  });
}

function getTotalIncome(callback) {
  const sql =
    "SELECT SUM(amount) AS totalIncome FROM transactions WHERE type = ?";

  db.get(sql, ["income"], function (error, row) {
    callback(error, row);
  });
}

function getTotalExpense(callback) {
  const sql =
    "SELECT SUM(amount) AS totalExpense FROM transactions WHERE type = ?";

  db.get(sql, ["expense"], function (error, row) {
    callback(error, row);
  });
}

function getBalance(callback) {
  const sql = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) -
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) 
      AS balance
    FROM transactions
  `;

  db.get(sql, [], function (error, row) {
    callback(error, row);
  });
}

function createTransaction(title, amount, type, date, callback) {
  const sql = `
    INSERT INTO transactions (title, amount, type, date)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [title, amount, type, date], function (error) {
    if (error) {
      return callback(error);
    }

    const newTransaction = {
      id: this.lastID,
      title: title,
      amount: Number(amount),
      type: type,
      date: date,
    };

    callback(null, newTransaction);
  });
}

function updateTransaction(id, title, amount, type, date, callback) {
  const sql = `
    UPDATE transactions
    SET title = ?, amount = ?, type = ?, date = ?
    WHERE id = ?
  `;

  db.run(sql, [title, amount, type, date, id], function (error) {
    if (error) {
      return callback(error);
    }

    if (this.changes === 0) {
      return callback(null, null);
    }

    const updatedTransaction = {
      id: id,
      title: title,
      amount: Number(amount),
      type: type,
      date: date,
    };

    callback(null, updatedTransaction);
  });
}

function deleteTransaction(id, callback) {
  const sql = "DELETE FROM transactions WHERE id = ?";

  db.run(sql, [id], function (error) {
    if (error) {
      return callback(error);
    }

    const isDeleted = this.changes > 0;

    callback(null, isDeleted);
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
