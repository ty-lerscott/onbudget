import isSameMonth from "date-fns/isSameMonth";

export default ({ expenses, categories, month }) => {
  const grouped = expenses.reduce((acc, expense) => {
    if (isSameMonth(new Date(expense.date), month)) {
      acc[expense.categoryId] =
        (acc?.[expense.categoryId] || 0) + expense.amount;
    }

    return acc;
  }, {});

  const named = Object.keys(grouped).reduce((acc, key) => {
    const { name = "", ...category } =
      categories?.find((category) => category.id === key) || {};

    acc[name] = { amount: grouped[key], ...category };

    return acc;
  }, {});

  return {
    datasets: [
      {
        data: Object.keys(named).map((key) => named[key].amount),
        backgroundColor: Object.keys(named).map((key) => named[key].color),
      },
    ],
    labels: Object.keys(named),
  };
};
