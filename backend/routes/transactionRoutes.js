const express = require("express");

const router = express.Router();

const transactionController = require("../controllers/transactionController");

router.get("/", transactionController.getAllTransactions);

// balance endpoints
router.get("/total-income", transactionController.getTotalIncome);
router.get("/total-expense", transactionController.getTotalExpense);
router.get("/balance", transactionController.getBalance);

//date filer endpoints
router.get("/month/:month", transactionController.getTransactionsByMonth);
router.get("/year/:year", transactionController.getTransactionsByYear);

router.get("/:id", transactionController.getTransactionById);
router.post("/", transactionController.createTransaction);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
