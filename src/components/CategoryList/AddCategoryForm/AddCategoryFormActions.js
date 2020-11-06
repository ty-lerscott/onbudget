import { CATEGORIES } from "state/AppReducer";

export const addCategoryAction = (body) => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  dispatch({
    type: `ADD_${CATEGORIES}_PENDING`,
  });

  return api({
    body,
    dispatch,
    getState,
    getFirebase,
    path: "addCategory",
  }).then(({ addCategory }) => {
    dispatch({
      type: `ADD_${CATEGORIES}_SUCCESS`,
      payload: body,
    });

    return addCategory;
  });
};
