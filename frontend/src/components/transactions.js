import React from 'react';
import IncomeItem from './incomeitem';
import { useGlobalContext } from '../context/globalcontext';

const Transactions = () => {
  const { incomes, deleteIncome } = useGlobalContext();
  const { expenses, deleteExpense } = useGlobalContext();

  // Combine incomes and expenses into one array
  const allTransactions = [...incomes, ...expenses];

  // Sort the combined array by date
  const sortedTransactions = allTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem',fontSize: '2.5rem', color: 'rgba(34, 34, 96, 1)' }}>
        ALL TRANSACTIONS
      </h1>
      <div className="transactions">
        {sortedTransactions.map(transaction => {
          const { _id, title, amount, date, category, description, type } = transaction;

          // Determine whether the transaction is credited or debited
          const transactionStatus = type === 'income' ? 'credited' : 'debited';

          return (
            <IncomeItem
              key={_id}
              id={_id}
              title={title}
              description={description}
              amount={amount}
              date={date}
              type={type}
              category={category}
              transactionStatus={transactionStatus}
              indicatorColor={transactionStatus === 'credited' ? 'var(--color-green)' : 'var(--color-red)'}
              deleteItem={type === 'income' ? deleteIncome : deleteExpense}
              mode={type === 'income' ? 'credited' : 'debited'}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Transactions;
