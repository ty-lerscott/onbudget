export const sumTransactions = (transactions = []) => {
  if (!Array.isArray(transactions) || !transactions.length) {
    return 0;
  }

  return transactions.reduce((sum, { amount }) => {
    if (!isNaN(amount)) {
      sum += amount;
    }

    return sum;
  }, 0);
};
