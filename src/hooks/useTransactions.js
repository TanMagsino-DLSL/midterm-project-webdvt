import { useState, useEffect } from 'react'

const STORAGE_KEY = 'budget-tracker-transactions'

export function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  function addTransaction(transaction) {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    }
    setTransactions((prev) => [...prev, newTransaction])
  }

  function updateTransaction(id, updates) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    )
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  function getTransactionById(id) {
    return transactions.find((t) => t.id === id)
  }

  function clearAll() {
  setTransactions([])
  }

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
    clearAll,
  }
}