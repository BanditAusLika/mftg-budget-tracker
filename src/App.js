import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState('$');
  const [editTransaction, setEditTransaction] = useState(null); // For editing transactions

  // Load transactions from localStorage when the component mounts
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
  }, []);

  // Save transactions to localStorage whenever the transactions state changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add or update a transaction
  const addTransaction = (transaction) => {
    if (editTransaction) {
      // Update the existing transaction
      setTransactions(
        transactions.map((t) =>
          t.id === editTransaction.id ? { ...transaction, id: t.id } : t
        )
      );
      setEditTransaction(null); // Clear the edit mode
    } else {
      setTransactions([...transactions, { ...transaction, id: Date.now() }]);
    }
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  // Start editing a transaction
  const startEditTransaction = (id) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id === id);
    setEditTransaction(transactionToEdit);
  };

  // Handle currency change
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="App">
      <Header />
      <div className="currency-selector">
        <label>Select Currency:</label>
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="$">USD ($)</option>
          <option value="€">EUR (€)</option>
          <option value="£">GBP (£)</option>
          <option value="¥">JPY (¥)</option>
        </select>
      </div>
      <Dashboard transactions={transactions} currency={currency} />
      <AddTransaction
        addTransaction={addTransaction}
        editTransaction={editTransaction}
        currency={currency}
      />
      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        editTransaction={startEditTransaction}
        currency={currency}
      />
      <Footer />
    </div>
  );
}

export default App;
