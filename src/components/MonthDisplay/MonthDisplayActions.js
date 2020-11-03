import { DATE } from "../../state/UIReducer";
import { EXPENSES } from "../../state/AppReducer";

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
      type: `${EXPENSES}_BY_MONTH_SUCCESS`,
      payload: transactionsByMonth,
    });
  });
};
