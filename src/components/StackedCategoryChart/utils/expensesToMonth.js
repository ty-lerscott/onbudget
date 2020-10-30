import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import isSameMonth from "date-fns/isSameMonth";

import toCurrency, { asNumber } from "../../../utils/currency";

export default ({ expenses, categories, month }) => {
  const last12Months = Array(12)
    .fill(0)
    .map((_, index) => addMonths(month, -index))
    .reverse();

  const datasets = categories
    .filter(({ isBill, isDeposit }) => !isBill && !isDeposit)
    .map((category) => {
      const data = last12Months.map((month) =>
        expenses.reduce((amount, expense) => {
          if (
            category.id === expense.categoryId &&
            isSameMonth(new Date(expense.date), month)
          ) {
            amount += expense.amount;
          }
          return asNumber(toCurrency(amount));
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
