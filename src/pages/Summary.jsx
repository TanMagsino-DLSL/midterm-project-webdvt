import { useTheme } from '../context/ThemeContext'
import { useTransactions } from '../hooks/useTransactions'
import { formatCurrency } from '../utils/formatCurrency'
import '../styles/Dashboard.css'
import '../styles/Summary.css'

function groupByCategory(transactions) {
  return transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})
}

function Summary() {
  const { theme, toggleTheme } = useTheme()
  const { transactions } = useTransactions()

  const expenses = transactions.filter((t) => t.type === 'expense')
  const income = transactions.filter((t) => t.type === 'income')

  const expensesByCategory = groupByCategory(expenses)
  const incomeByCategory = groupByCategory(income)

  const totalExpenses = Object.values(expensesByCategory).reduce((sum, n) => sum + n, 0)
  const totalIncome = Object.values(incomeByCategory).reduce((sum, n) => sum + n, 0)

  function renderBreakdown(byCategory, total, type) {
    if (Object.keys(byCategory).length === 0) {
      return <p className="empty-state">No {type} yet.</p>
    }

    return (
      <div className="category-breakdown">
        {Object.entries(byCategory).map(([category, amount]) => {
          const percent = (amount / total) * 100
          return (
            <div className="category-row" key={category}>
              <div className="category-row-header">
                <span className="category-name">{category}</span>
                <span className={`category-amount ${type === 'expenses' ? 'expense' : 'income'}`}>
                  ₱{formatCurrency(amount)}
                </span>
              </div>
              <div className="category-bar-track">
                <div className="category-bar-fill" style={{ width: `${percent}%` }} />
              </div>
              <p className="category-percent">{percent.toFixed(1)}%</p>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Summary</h1>

      <div className="theme-toggle-row">
        <button className="btn btn-secondary" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
      </div>

      <div className="totals-row">
        <div className="stat-panel">
          <p className="stat-label">Total Income</p>
          <p className="stat-amount" style={{ color: 'var(--positive)' }}>
            ₱{formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="stat-panel">
          <p className="stat-label">Total Expenses</p>
          <p className="stat-amount" style={{ color: 'var(--negative)' }}>
            ₱{formatCurrency(totalExpenses)}
          </p>
        </div>
      </div>

      <h2>Expenses by Category</h2>
      {renderBreakdown(expensesByCategory, totalExpenses, 'expenses')}

      <h2>Income by Category</h2>
      {renderBreakdown(incomeByCategory, totalIncome, 'income')}
    </div>
  )
}

export default Summary