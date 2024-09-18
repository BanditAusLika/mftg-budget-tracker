import React, { useState, useEffect } from 'react';

function AddTransaction({ addTransaction, editTransaction, currency }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  // Prefill the form when editing a transaction
  useEffect(() => {
    if (editTransaction) {
      setName(editTransaction.name);
      setAmount(editTransaction.amount);
      setType(editTransaction.type);
    } else {
      // Clear form fields when no edit is happening
      setName('');
      setAmount('');
      setType('income');
    }
  }, [editTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      name,
      amount: parseFloat(amount),
      type,
    };
    addTransaction(transaction);
    setName(''); // Clear the form after adding/updating
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
      <button type="submit">
        {editTransaction ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  );
}

export default AddTransaction;
