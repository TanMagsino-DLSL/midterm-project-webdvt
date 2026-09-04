import { memo } from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

function TransactionRow({ transaction }) {
  return (
    <Link to={`/transaction/${transaction.id}`} className="transaction-row">
      <div className="transaction-main">
        <span className="transaction-desc">{transaction.description}</span>
        <span className="transaction-category">
          {transaction.category} · {new Date(transaction.date).toLocaleDateString()}
        </span>
      </div>
      <span className={`transaction-amount ${transaction.type}`}>
        {transaction.type === 'income' ? '+' : '-'}₱{formatCurrency(transaction.amount)}
      </span>
    </Link>
  )
}

export default memo(TransactionRow)