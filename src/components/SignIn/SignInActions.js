import { SIGN_IN, FORGOT_PASSWORD } from "state/SessionReducer";

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

export const logoutAction = (props) => async (
  dispatch,
  getState,
  { getFirebase, api },
  ...rest
) => {
  const firebase = getFirebase();

  dispatch({
    type: `${SIGN_IN}_PENDING`,
  });

  // try {
  await firebase.logout();

  //   dispatch({
  //     type: `${SIGN_IN}_SUCCESS`,
  //   });

  //   return;
  // } catch (err) {
  //   dispatch({
  //     type: `${SIGN_IN}_FAILURE`,
  //     payload: err.message,
  //   });

  //   throw new Error(err.message);
  // }
};
