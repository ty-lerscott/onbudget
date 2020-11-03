export const sumTransactions = (transactions = []) =>
  transactions.reduce((sum, { amount }) => {
    sum += amount;

    return sum;
  }, 0);
