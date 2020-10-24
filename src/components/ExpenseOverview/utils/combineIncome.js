import isSameMonth from "date-fns/isSameMonth";

const round = (amount) => Math.round((amount + Number.EPSILON) * 100) / 100;

export default ({ incomes, month, expenses }) => {
  const expensesTotal = expenses.reduce((acc, expense) => {
    if (isSameMonth(new Date(expense.paidOn), month)) {
      acc += expense.amount;
    }

    return acc;
  }, 0);

  const income = incomes.reduce((acc, income) => {
    if (isSameMonth(new Date(income.depositedOn), month)) {
      acc += income.amount;
    }

    return acc;
  }, 0);

  return round(income - expensesTotal);
};
