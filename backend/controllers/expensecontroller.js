const ExpenseSchema = require("../models/expensemodel");


const addExpense = async (req, res) => {
    const { title, amount, category, description, date,userId } = req.body;

    try {
        // Validations
        if (!title || !amount || !category || !description || !date || !userId) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date,
            user:userId  // Associate the expense with the user
        });

        await expense.save();
        console.log(expense)
        res.status(200).json({ message: 'Expense Added', expense });
    } catch (error) {
        console.error('Error in addExpense:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Function to get all expenses for a user
const getExpenses = async (req, res) => {
    try {
        const {userId} = req.body; // Assuming userId is passed as a URL parameter
        const expenses = await ExpenseSchema.find({ user: userId }).sort({ createdAt: -1 }); // Filter by userId
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error in getExpenses:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};



// Function to delete expense
const deleteExpense = async (req, res) => {
    const { id } = req.params;
     // Assuming userId is passed in the URL for validation

     try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'expsense Deleted' });
    } catch (error) {
        console.error('Error in deleteexpense:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


module.exports = { addExpense, getExpenses, deleteExpense };
