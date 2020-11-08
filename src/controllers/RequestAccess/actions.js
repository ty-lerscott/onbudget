import { REQUEST_ACCESS } from "state/SessionReducer";

export const requestAccessAction = (body) => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  dispatch({
    type: `${REQUEST_ACCESS}_PENDING`,
  });

  return api({
    body,
    dispatch,
    getState,
    getFirebase,
    path: "requestAccess",
  }).then(({ requestAccess: { errors, ...requestAccess } = {} } = {}) => {
    if (errors) {
      dispatch({
        type: `${REQUEST_ACCESS}_FAILURE`,
        payload: errors,
      });

      throw new Error(errors[0].message);
    } else {
      dispatch({
        type: `${REQUEST_ACCESS}_SUCCESS`,
        payload: requestAccess,
      });
    }

    localStorage.setItem("hasRequestedAccess", true);

    return requestAccess;
  });
};
