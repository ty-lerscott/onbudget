import { TRANSACTIONS, SET_CURRENT_PAGE } from "state/AppReducer";

export const fetchTransactions = ({ page, limit, startAt }) => async (
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
      limit,
      startAt,
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

export const setCurrentPageAction = (page) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: page,
  });
};
