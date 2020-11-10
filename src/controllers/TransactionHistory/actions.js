import { TRANSACTIONS } from "state/AppReducer";

export const getTransactionCountAction = (body) => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  dispatch({
    type: `${TRANSACTIONS}_COUNT_PENDING`,
  });

  return api({
    body,
    dispatch,
    getState,
    getFirebase,
    path: "getTransactionCount",
  }).then(({ getTransactionCount, errors }) => {
    if (errors) {
      dispatch({
        type: `${TRANSACTIONS}_COUNT_FAILURE`,
        payload: errors,
      });

      throw new Error(errors[0].message);
    } else {
      dispatch({
        type: `${TRANSACTIONS}_COUNT_SUCCESS`,
        payload: getTransactionCount,
      });
    }

    return getTransactionCount;
  });
};

export const fetchTransactions = ({ page, limit }) => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  dispatch({
    type: `PAGINATED_${TRANSACTIONS}_PENDING`,
  });

  return api({
    dispatch,
    getState,
    getFirebase,
    path: "transactions",
    body: {
      page,
      limit,
    },
  }).then(({ transactions } = {}) => {
    dispatch({
      type: `PAGINATED_${TRANSACTIONS}_SUCCESS`,
      payload: {
        page,
        data: transactions,
      },
    });

    return transactions;
  });
};
