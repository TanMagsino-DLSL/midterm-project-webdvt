import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTransactions } from '../hooks/useTransactions'
import { CATEGORIES } from '../utils/categories'
import '../styles/Dashboard.css'
import '../styles/Forms.css'

function AddTransaction() {
  const { addTransaction } = useTransactions()
  const navigate = useNavigate()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!description.trim()) {
      setError('Invalid input! A description is required.')
      return
    }
    if (!amount || Number(amount) <= 0) {
      setError('Invalid input! Amount must be a number greater than 0.')
      return
    }

    addTransaction({
      description: description.trim(),
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString(),
    })

    navigate('/')
  }

  return (
    <div className="page">
      <h1 className="page-title page-title-center">Add Transaction</h1>

      <form onSubmit={handleSubmit} noValidate className="form-panel">
        {error && <p className="form-error">{error}</p>}

        <div className="form-field">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Amount (₱)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
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
          <button type="submit" className="btn btn-primary">Add Transaction</button>
        </div>
      </form>
    </div>
  )
}

export default AddTransaction