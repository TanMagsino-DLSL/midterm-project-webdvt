export function formatCurrency(amount) {
  return Math.abs(amount).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}