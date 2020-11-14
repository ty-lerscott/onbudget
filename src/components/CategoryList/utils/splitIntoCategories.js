const getCategory = (categories, id) =>
  (categories || []).find((category) => category.id === id);

const defaultBreakdown = {
  total: 0,
  quantity: 0,
  transactions: [],
};

// given an array of transactions, group them by category
// return them as an array sorted by the total spent in that category
const splitIntoCategories = ({ transactions, categories } = {}) => {
  if (!categories?.length || !transactions?.length) {
    return [];
  }

  const transactionsForThisMonth = transactions.reduce(
    (byCategory, transaction) => {
      const { categoryId } = transaction;

      const category = getCategory(categories, categoryId);

      if (!byCategory[category.name]) {
        byCategory[category.name] = {
          ...defaultBreakdown,
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

  const byCategory = categories.map((category) => ({
    ...category,
    ...defaultBreakdown,
    ...transactionsForThisMonth[category.name],
  }));

  const entries = Object.entries(byCategory);

  entries.sort((a, b) => b[1].total - a[1].total);

  return entries.map(([key, value]) => value);
};

export default splitIntoCategories;
