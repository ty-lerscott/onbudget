import isSameMonth from "date-fns/isSameMonth";

import round from "../../../utils/currency";

export default ({ expenses, month }) => {
  const amount = expenses.reduce((acc, expense) => {
    if (isSameMonth(new Date(expense.date), month)) {
      acc = acc + expense.amount;
    }

    return acc;
  }, 0);
  return round(amount);
};
