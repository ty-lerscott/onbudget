const now = new Date()

const calculateSpending = transactions => {
  if (!transactions || !Array.isArray(transactions)) {
    return 0
  }

  const dayNumber = now.getDate()

  const total = transactions.reduce((acc, { amount }) => {
    acc += amount

    return acc
  }, 0)

  return total / dayNumber
}

export default calculateSpending
