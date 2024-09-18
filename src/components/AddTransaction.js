import React, { useState } from 'react';

function AddTransaction({ addTransaction, currency }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      name,
      amount: parseFloat(amount),
      type,
    };
    addTransaction(transaction);
    setName('');
    setAmount('');
    setType('income');
  };

  return (
    <form onSubmit={handleSubmit} className="add-transaction-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Transaction Name"
        required
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <span style={{ marginLeft: '10px', color: '#00ffff' }}>{currency}</span>
      </div>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransaction;
