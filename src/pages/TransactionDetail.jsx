import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTransactions } from '../hooks/useTransactions'
import { formatCurrency } from '../utils/formatCurrency'
import { CATEGORIES } from '../utils/categories'
import '../styles/Dashboard.css'
import '../styles/Forms.css'

function TransactionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTransactionById, updateTransaction, deleteTransaction } = useTransactions()

  const transaction = getTransactionById(id)

  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(transaction?.description ?? '')
  const [amount, setAmount] = useState(transaction?.amount ?? '')
  const [type, setType] = useState(transaction?.type ?? 'expense')
  const [category, setCategory] = useState(transaction?.category ?? CATEGORIES[0])
  const [error, setError] = useState('')

  if (!transaction) {
    return (
      <div className="page">
        <h1 className="page-title">Transaction not found</h1>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    )
  }

  function handleSave(e) {
    e.preventDefault()

    if (!description.trim()) {
      setError('Invalid input! A description is required.')
      return
    }
    if (!amount || Number(amount) <= 0) {
      setError('Invalid input! Amount must be a number greater than 0.')
      return
    }

    updateTransaction(id, {
      description: description.trim(),
      amount: Number(amount),
      type,
      category,
    })
    setIsEditing(false)
  }

  function handleDelete() {
  const confirmed = window.confirm(`Delete "${transaction.description}"? This cannot be undone.`)
  if (!confirmed) return

  deleteTransaction(id)
  navigate('/')
}

  if (isEditing) {
    return (
      <div className="page">
        <button className="btn btn-secondary back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className="page-title page-title-center">Edit Transaction</h1>
        <form onSubmit={handleSave} noValidate className="form-panel">
          {error && <p className="form-error">{error}</p>}

          <div className="form-field">
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="form-field">
            <label>Amount (₱)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div className="form-field">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-field">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }

  return (
  <div className="page">
    <button className="btn btn-secondary back-button" onClick={() => navigate(-1)}>
      ← Back
    </button>


    <h1 className="page-title page-title-center">{transaction.description}</h1>

    <div className="detail-wrapper">
      <div className="detail-panel">
        <div className="detail-row">
          <span className="detail-label">Amount</span>
          <span className="detail-value">
            {transaction.type === 'income' ? '+' : '-'}₱{formatCurrency(transaction.amount)}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Type</span>
          <span className="detail-value">{transaction.type}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Category</span>
          <span className="detail-value">{transaction.category}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Date</span>
          <span className="detail-value">{new Date(transaction.date).toLocaleString()}</span>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </div>
)
}

export default TransactionDetail