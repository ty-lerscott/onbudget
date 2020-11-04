import { TRANSACTIONS, STATEMENT } from "../../state/AppReducer";

export const addTransactionAction = (body) => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  dispatch({
    type: `ADD_${TRANSACTIONS}_PENDING`,
  });

  return api({
    body,
    dispatch,
    getState,
    getFirebase,
    path: "addTransaction",
  }).then(({ addTransaction }) => {
    dispatch({
      type: `ADD_${TRANSACTIONS}_SUCCESS`,
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
    type: `IMPORT_${STATEMENT}_PENDING`,
  });

  return api({
    body,
    dispatch,
    getState,
    getFirebase,
    path: "importStatement",
  }).then(({ importStatement } = {}) => {
    dispatch({
      type: `IMPORT_${STATEMENT}_SUCCESS`,
      payload: importStatement,
    });

    return importStatement;
  });
};
