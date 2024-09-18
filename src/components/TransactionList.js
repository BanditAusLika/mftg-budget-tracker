import React from 'react';

function TransactionList({ transactions, deleteTransaction, editTransaction, currency }) {
  return (
    <div className="transaction-list">
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.name} - {currency}{transaction.amount} [{transaction.type}]
            <div>
              <button onClick={() => editTransaction(transaction.id)}>Edit</button>
              <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
