import React from 'react';

function Dashboard({ transactions, currency }) {
  const calculateTotal = (type) =>
    transactions
      .filter((transaction) => transaction.type === type)
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const income = calculateTotal('income');
  const expense = calculateTotal('expense');
  const balance = income - expense;

  return (
    <div className="dashboard">
      <div className="balance">
        <h2>Balance: {currency}{balance}</h2>
      </div>
      <div className="summary">
        <div>Income: {currency}{income}</div>
        <div>Expense: {currency}{expense}</div>
      </div>
    </div>
  );
}

export default Dashboard;
