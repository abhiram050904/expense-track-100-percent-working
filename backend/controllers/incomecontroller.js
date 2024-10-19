const Income = require('../models/incomemodel');

const addIncome = async (req, res) => {
    const { title, amount, category, description, date, userId } = req.body;

    try {
        if (!title || !category || !description || !date || !userId) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const income = new Income({
            title,
            amount,
            category,
            description,
            date,
            user: userId // Storing userId in the "user" field
        });

        await income.save();
        console.log(income);
        res.status(200).json({ message: 'Income added successfully', income });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getIncomes = async (req, res) => {
    try {
        const { userId } = req.body; // Ensure userId is retrieved from the request body
        const incomes = await Income.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteIncome = async (req, res) => {
    const { id } = req.params;
    
    try {
        await Income.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { addIncome, getIncomes, deleteIncome };
