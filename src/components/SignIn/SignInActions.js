import { SIGN_IN } from "state/SessionReducer";

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
