import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "https://expense-tracker-x9wt.onrender.com/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId');

    const addIncome = async (income) => {
        if (!userId) {
            setError("User ID is not available");
            return;
        }
        const response = await axios.post(`${BASE_URL}add-income`, { ...income, userId })
            .catch((err) => {
                setError(err.response.data.message);
            });
        getIncomes();
    };

    const getIncomes = async () => {
        const userId = localStorage.getItem('userId'); // Get userId from local storage
        const response = await axios.post(`${BASE_URL}get-incomes`, { userId }) // Change to POST
            .catch(err => {
                console.error(err);
                setError(err.response.data.message);
            });
        if (response) {
            setIncomes(response.data);
            console.log(response.data);
        }
    };

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
        getIncomes();
    };

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount;
        });
        return totalIncome;
    };

    // Expense functionality
    const addExpense = async (expense) => {
        if (!userId) {
            setError("User ID is not available");
            return;
        }
        const response = await axios.post(`${BASE_URL}add-expense`, { ...expense, userId })
            .catch((err) => {
                setError(err.response.data.message);
            });
        getExpenses();
    };

    const getExpenses = async () => {
        const userId = localStorage.getItem('userId');
        const response = await axios.post(`${BASE_URL}get-expenses`, { userId })
            .catch(err => {
                console.error(err);
                setError(err.response.data.message);
            });
        if (response) {
            setExpenses(response.data); // Update to setExpenses instead of setIncomes
            console.log(response.data);
        }
    };

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
        getExpenses();
    };

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
            totalExpense += expense.amount;
        });
        return totalExpense;
    };

    const totalBalance = () => {
        // Calculate the balance considering both income and expenses
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]; // Include both incomes and expenses
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalIncome,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
