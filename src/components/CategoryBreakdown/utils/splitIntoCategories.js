import isSameMonth from "date-fns/isSameMonth";
import round from "../../../utils/currency";

export default ({ expenses, month, categories }) => {
  const billCategories = categories.reduce((acc, { isBill, id }) => {
    if (isBill) {
      acc.push(id);
    }
    return acc;
  }, []);

  const grouped = expenses.reduce((acc, expense) => {
    if (
      isSameMonth(new Date(expense.date), month) &&
      !billCategories.includes(expense.categoryId)
    ) {
      acc[expense.categoryId] = {
        amount: (acc?.[expense.categoryId]?.amount || 0) + expense.amount,
        quantity: (acc?.[expense.categoryId]?.quantity || 0) + 1,
      };
    }

    return acc;
  }, {});

  let entries = Object.entries(grouped);

  entries.sort((a, b) => b[1].amount - a[1].amount);

  return entries.map(([categoryId, { amount, quantity }]) => {
    const { color = "", name } =
      categories.find((category) => category.id === categoryId) || {};

    return {
      name,
      color,
      quantity,
      amount: round(amount),
    };
  });
};
