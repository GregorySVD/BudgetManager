let transactions = [
  {
    id: 1,
    title: "Salary",
    amount: 4000,
    type: "income",
    date: "2025-01-10T09:00",
  },
  {
    id: 2,
    title: "Groceries",
    amount: 150,
    type: "expense",
    date: "2025-01-12T17:30",
  },
  {
    id: 3,
    title: "Internet bill",
    amount: 80,
    type: "expense",
    date: "2025-02-05T12:00",
  },
];

function getAllTransactions() {
  return transactions;
}

function getTransactionById(id) {
  return transactions.find(function (transaction) {
    return transaction.id === id;
  });
}

function getTransactionsByMonth(month) {
  return transactions.filter(function (transaction) {
    return transaction.date.startsWith(month);
  });
}

function getTransactionsByYear(year) {
  return transactions.filter(function (transaction) {
    return transaction.date.startsWith(year);
  });
}

function getTotalIncome() {
  let total = 0;

  transactions.forEach(function (transaction) {
    if (transaction.type === "income") {
      total = total + transaction.amount;
    }
  });

  return total;
}

function getTotalExpense() {
  let total = 0;

  transactions.forEach(function (transaction) {
    if (transaction.type === "expense") {
      total = total + transaction.amount;
    }
  });

  return total;
}

function getBalance() {
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();

  return totalIncome - totalExpense;
}

function createTransaction(title, amount, type, date) {
  const newTransaction = {
    id: Date.now(),
    title: title,
    amount: Number(amount),
    type: type,
    date: date,
  };

  transactions.push(newTransaction);

  return newTransaction;
}

function updateTransaction(id, title, amount, type, date) {
  const transaction = getTransactionById(id);

  if (!transaction) {
    return null;
  }

  transaction.title = title;
  transaction.amount = Number(amount);
  transaction.type = type;
  transaction.date = date;

  return transaction;
}

function deleteTransaction(id) {
  const transactionExists = transactions.some(function (transaction) {
    return transaction.id === id;
  });

  if (!transactionExists) {
    return false;
  }

  transactions = transactions.filter(function (transaction) {
    return transaction.id !== id;
  });

  return true;
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
