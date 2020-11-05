import { LOADING_COMPLETE } from "../../state/UIReducer";
import { CATEGORIES, TRANSACTIONS } from "../../state/AppReducer";

export const fetchCategories = () => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  dispatch({
    type: `${CATEGORIES}_PENDING`,
  });

  return api({
    dispatch,
    getState,
    getFirebase,
    path: "categories",
  })
    .then(({ categories } = {}) => {
      dispatch({
        type: `${CATEGORIES}_SUCCESS`,
        payload: categories,
      });

      return categories;
    })
    .finally(() => {
      dispatch(setLoadingComplete("categoryList"));
    });
};

export const fetchTransactions = () => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  return api({
    dispatch,
    getState,
    getFirebase,
    path: "transactions",
  })
    .then(({ transactions } = {}) => {
      dispatch({
        type: `${TRANSACTIONS}_SUCCESS`,
        payload: transactions,
      });

      return transactions;
    })
    .finally(() => {
      dispatch(setLoadingComplete("overview"));
      dispatch(setLoadingComplete("overallSpending"));
      dispatch(setLoadingComplete("categoryBreakdown"));
      dispatch(setLoadingComplete("transactionOverview"));
    });
};

export const setLoadingComplete = (componentName) => ({
  type: `SET_${LOADING_COMPLETE}`,
  payload: componentName,
});
