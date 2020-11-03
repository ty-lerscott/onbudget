import {
  SIGN_IN,
  REQUEST_ACCESS,
  FORGOT_PASSWORD,
} from "../../state/SessionReducer";

export const loginAction = (props) => async (
  dispatch,
  getState,
  { getFirebase, api },
  ...rest
) => {
  const firebase = getFirebase();

  dispatch({
    type: `${SIGN_IN}_PENDING`,
  });

  try {
    await firebase.login(props);

    dispatch({
      type: `${SIGN_IN}_SUCCESS`,
    });

    return;
  } catch (err) {
    dispatch({
      type: `${SIGN_IN}_FAILURE`,
      payload: err.message,
    });

    throw new Error(err.message);
  }
};

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
    console.warn({ errors, requestAccess });
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

export const forgotPasswordAction = ({ email }) => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  dispatch({
    type: `${FORGOT_PASSWORD}_PENDING`,
  });

  const firebase = getFirebase();

  return firebase.resetPassword(email).catch((error) => {
    throw new Error(error.message);
  });
};
