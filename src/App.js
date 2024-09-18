import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState('$'); // Default currency is $

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value); // Update the currency based on the user's selection
  };

  return (
    <div className="App">
      <Header />
      {/* Currency Selector */}
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
      <AddTransaction addTransaction={addTransaction} currency={currency} />
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} currency={currency} />
      <Footer />
    </div>
  );
}

export default App;
