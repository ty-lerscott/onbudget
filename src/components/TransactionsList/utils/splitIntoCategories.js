const getCategory = (categories, id) =>
  (categories || []).find((category) => category.id === id);

// given an array of transactions, group them by category
// return them as an array sorted by the total spent in that category
export default (transactions, categories) => {
  if (!transactions.length || !categories.length) {
    return [];
  }

  const transactionsForThisMonth = transactions.reduce(
    (byCategory, transaction) => {
      const { categoryId } = transaction;

      const category = getCategory(categories, categoryId);

      if (!byCategory[category.name]) {
        byCategory[category.name] = {
          total: 0,
          quantity: 0,
          transactions: [],
          ...category,
        };
      }

      byCategory[category.name].quantity += 1;
      byCategory[category.name].transactions.push(transaction);
      byCategory[category.name].total += transaction.amount;

      return byCategory;
    },
    {}
  );

  const entries = Object.entries(transactionsForThisMonth);

  entries.sort((a, b) => b[1].total - a[1].total);

  return entries.map(([key, value]) => value);
};
