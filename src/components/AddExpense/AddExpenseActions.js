import { EXPENSES } from "../../state/AppReducer";

export const addExpenseAction = (body) => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  dispatch({
    type: `ADD_${EXPENSES}_PENDING`,
  });

  return api({
    body,
    dispatch,
    getState,
    getFirebase,
    path: "addExpense",
  }).then(({ addExpense }) => {
    dispatch({
      type: `ADD_${EXPENSES}_SUCCESS`,
      payload: addExpense,
    });

    return addExpense;
  });
};
