import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import isSameMonth from "date-fns/isSameMonth";

const round = (amount) => Math.round((amount + Number.EPSILON) * 100) / 100;

export default ({ expenses, categories, month }) => {
  const last12Months = Array(12)
    .fill(0)
    .map((_, index) => addMonths(month, -index))
    .reverse();

  const datasets = categories.map((category) => {
    const data = last12Months.map((month) =>
      expenses.reduce((amount, expense) => {
        if (
          category.id === expense.categoryId &&
          isSameMonth(new Date(expense.date), month)
        ) {
          amount += expense.amount;
        }
        return round(amount);
      }, 0)
    );

    return {
      data,
      label: category.name,
      backgroundColor: category.color,
    };
  });

  return {
    datasets,
    labels: last12Months.map((month) => format(month, "MMM yyyy")),
  };
};
