import { DATE } from "state/UIReducer";
import { TRANSACTIONS } from "state/AppReducer";

export const setMonthAction = (month) => (
  dispatch,
  getState,
  { getFirebase, api },
  ...rest
) => {
  dispatch({
    type: `SET_${DATE}`,
    payload: month,
  });
};

export const fetchTransactionsByMonthAction = (body) => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  return api({
    body,
    dispatch,
    getState,
    getFirebase,
    path: "transactionsByMonth",
  }).then(({ transactionsByMonth }) => {
    dispatch({
      type: `${TRANSACTIONS}_BY_MONTH_SUCCESS`,
      payload: transactionsByMonth,
    });
  });
};
