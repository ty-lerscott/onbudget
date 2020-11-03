export const SESSION = "SESSION";
export const SIGN_IN = "SIGN_IN";
export const REQUEST_ACCESS = "REQUEST_ACCESS";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";

const initialState = {
  token: "",
  claims: [],
  authTime: "",
  fetched: false,
  issuedAtTime: "",
  expirationTime: "",
  signInProvider: "",
  signInSecondFactor: "",
};

const session = (state = initialState, { type, payload }) => {
  switch (type) {
    case `${SESSION}_SUCCESS`:
      return {
        ...state,
        ...payload,
        fetched: true,
      };
    case "@@reactReduxFirebase/AUTH_EMPTY_CHANGE":
      return {
        ...state,
        fetched: true,
      };
    case `${SESSION}_PENDING`:
    default:
      return state;
  }
};

export default session;
