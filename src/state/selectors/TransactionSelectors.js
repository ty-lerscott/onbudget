import clone from "clone-deep";
import { createSelector } from "reselect";
import {
  format,
  isAfter,
  addMonths,
  isSameMonth,
  startOfMonth,
} from "date-fns";

import {
  getBillCategories,
  getDepositCategories,
  getUnplannedCategories,
  getCategoriesFromState,
} from "./CategorySelectors";

const getActiveDateFromState = (state) => state.ui.date;
const getTransactionsFromState = (state) => state.app.transactions;

const filterTransactions = ({ thisMonth }) => (
  transactions,
  categories,
  activeDate
) => {
  if (!transactions.length || !categories.length) {
    return [];
  }

  const categoryIds = categories.map(({ id }) => id);

  return transactions.filter(({ categoryId, date }) => {
    const categoryIsIncluded = categoryIds.includes(categoryId);

    return thisMonth
      ? isSameMonth(date, activeDate) && categoryIsIncluded
      : categoryIsIncluded &&
          isAfter(new Date(date), startOfMonth(addMonths(activeDate, -11))) &&
          !isAfter(new Date(date), activeDate);
  });
};

const getBillTransactions = createSelector(
  [getTransactionsFromState, getBillCategories, getActiveDateFromState],
  filterTransactions({ thisMonth: true })
);

const getDepositTransactions = createSelector(
  [getTransactionsFromState, getDepositCategories, getActiveDateFromState],
  filterTransactions({ thisMonth: true })
);

const getUnplannedTransactions = createSelector(
  [getTransactionsFromState, getUnplannedCategories, getActiveDateFromState],
  filterTransactions({ thisMonth: true })
);

export const getMonthTransactions = createSelector(
  [
    getTransactionsFromState,
    getBillTransactions,
    getDepositTransactions,
    getUnplannedTransactions,
  ],
  (all, bills, deposits, unplanned) => {
    return {
      all,
      bills,
      deposits,
      unplanned,
    };
  }
);

export const getAllMonthTransactions = createSelector(
  [getTransactionsFromState, getCategoriesFromState, getActiveDateFromState],
  (transactions, categories, activeDate) => {
    return transactions.reduce((acc, transaction) => {
      if (isSameMonth(new Date(transaction.date), activeDate)) {
        const cloned = clone(transaction);

        cloned.category =
          categories.find(({ id }) => id === cloned.categoryId)?.name || "";
        acc.push(cloned);
      }

      return acc;
    }, []);
  }
);

export const hasRequestedYearsWorth = createSelector(
  [getTransactionsFromState, getActiveDateFromState],
  (transactions, activeDate) =>
    transactions.some((transaction) =>
      isSameMonth(transaction.date, addMonths(activeDate, -11))
    )
);

export const formatTransactionsForStackedBarGraph = createSelector(
  [getTransactionsFromState, getUnplannedCategories, getActiveDateFromState],
  (transactions, categories, activeDate) => {
    if (!(transactions || []).length || !(categories || []).length) {
      return null;
    }

    const unplannedIds = categories.map(({ id }) => id);
    const range = Array(12)
      .fill(0)
      .map((_, index) => startOfMonth(addMonths(activeDate, -(11 - index))));

    const transactionsByCategoryByMonth = transactions.reduce(
      (byCategory, transaction) => {
        // when the transaction is within the unplanned category
        if (unplannedIds.includes(transaction.categoryId)) {
          const category = categories.find(
            (category) => category.id === transaction.categoryId
          );

          // if the category doesnt already exist in the accumulator
          if (!byCategory[category.name]) {
            byCategory[category.name] = {
              label: category.name,
              backgroundColor: category.color,
              // data represents months as an array
              // 0 = oldest month
              // 11 = newest month
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            };
          }

          // now find the index within the range corresponding to this transaction
          const monthIndex = range.findIndex((date) =>
            isSameMonth(date, transaction.date)
          );

          // update the category data @ the index just located
          byCategory[category.name].data[monthIndex] += transaction.amount;
        }

        return byCategory;
      },
      {}
    );

    return {
      datasets: Object.values(transactionsByCategoryByMonth),
      labels: range.map((month) => format(month, "MMM yyyy")),
    };
  }
);
