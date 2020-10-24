import isSameMonth from "date-fns/isSameMonth";

export default ({ expenses, month }) => {
  const amount = expenses.reduce((acc, expense) => {
    if (isSameMonth(new Date(expense.paidOn), month)) {
      acc = acc + expense.amount;
    }

    return acc;
  }, 0);

  return Math.round((amount + Number.EPSILON) * 100) / 100;
};
