import { EXPENSES, STATEMENT } from "../../state/AppReducer";

export const addTransactionAction = (body) => async (
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
    path: "addTransaction",
  }).then(({ addTransaction }) => {
    dispatch({
      type: `ADD_${EXPENSES}_SUCCESS`,
      payload: addTransaction,
    });

    return addTransaction;
  });
};

export const importStatementAction = (body) => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  dispatch({
    type: `ADD_${STATEMENT}_PENDING`,
  });

  return api({
    body,
    dispatch,
    getState,
    getFirebase,
    path: "addStatement",
  }).then(({ addStatement }) => {
    dispatch({
      type: `ADD_${STATEMENT}_SUCCESS`,
      payload: addStatement,
    });

    return addStatement;
  });
};
