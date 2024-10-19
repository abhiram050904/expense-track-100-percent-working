const router = require('express').Router();
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expensecontroller');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomecontroller');

router.post('/add-income', addIncome);
router.post('/get-incomes', getIncomes);
router.delete('/delete-income/:id', deleteIncome);

router.post('/add-expense', addExpense); 
router.post('/get-expenses', getExpenses);
router.delete('/delete-expense/:id', deleteExpense);

module.exports = router;
