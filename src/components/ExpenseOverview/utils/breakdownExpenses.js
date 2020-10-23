import isSameMonth from "date-fns/isSameMonth";

const round = (amount) => Math.round((amount + Number.EPSILON) * 100) / 100;

export default ({ expenses, month }) => {
  const { bills, unplanned } = expenses.reduce(
    (acc, expense) => {
      if (isSameMonth(new Date(expense.paid_on), month)) {
        if (expense.isBill) {
          acc.bills = (acc.bills || 0) + expense.amount;
        } else {
          acc.unplanned = (acc.unplanned || 0) + expense.amount;
        }
      }

      return acc;
    },
    { bills: 0, unplanned: 0 }
  );

  return {
    bills: round(bills),
    unplanned: round(unplanned),
  };
};
