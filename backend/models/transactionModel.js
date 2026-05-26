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

function getAllTransactions() {
  return transactions;
}

function getTransactionById(id) {
  return transactions.find(function (transaction) {
    return transaction.id === id;
  });
}

function createTransaction(title, amount, type) {
  const newTransaction = {
    id: Date.now(),
    title: title,
    amount: Number(amount),
    type: type,
  };

  transactions.push(newTransaction);

  return newTransaction;
}

function updateTransaction(id, title, amount, type) {
  const transaction = getTransactionById(id);

  if (!transaction) {
    return null;
  }

  transaction.title = title;
  transaction.amount = Number(amount);
  transaction.type = type;

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
};
