import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTransactions } from '../hooks/useTransactions'
import { formatCurrency } from '../utils/formatCurrency'
import TransactionRow from '../components/TransactionRow'
import '../styles/Dashboard.css'

function Dashboard() {
  const { transactions, clearAll } = useTransactions()
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const categories = ['All', ...new Set(transactions.map((t) => t.category))]

  const filtered = transactions
  .filter((t) => {
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter
    const matchesType = typeFilter === 'All' || t.type === typeFilter
    return matchesCategory && matchesType
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

  const balance = transactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount
  }, 0)

  function handleClearAll() {
    const confirmed = window.confirm('Delete all transactions? This cannot be undone.')
    if (!confirmed) return
    clearAll()
  }

  return (
    <div className="page">
      <h1 className="page-title"> Dashboard </h1>

      <div className="balance-panel">
        <p className="balance-label">Current Balance</p>
        <p className={`balance-amount ${balance >= 0 ? 'positive' : 'negative'}`}>
          {balance < 0 ? '-' : ''}₱{formatCurrency(balance)}
        </p>
      </div>

      {transactions.length > 0 && (
      <div className="clear-all-row">
        <button className="btn btn-danger" onClick={handleClearAll}>Clear All Transactions</button>
      </div>
      )}

      <div className="filters">
        <div className="filter-group">
          <label>Category</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Type</label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state-first">
          <p>You haven't added any transactions yet.</p>
          <Link to="/add" className="btn btn-primary">Add your first transaction</Link>
        </div>
      ) : filtered.length === 0 ? (
        <p className="empty-state">No transactions found.</p>
      ) : (
        <ul className="transaction-list">
          {filtered.map((t) => (
            <li key={t.id}>
              <TransactionRow transaction={t} />
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}

export default Dashboard