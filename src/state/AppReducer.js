import clone from "clone-deep";
import { combineReducers } from "redux";

const SET_PER_PAGE = "SET_PER_PAGE";
export const STATEMENT = "STATEMENT";
export const CATEGORIES = "CATEGORIES";
export const TRANSACTIONS = "TRANSACTIONS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

const initialState = {
  isLoading: true,
  categories: [],
  isFetching: false,
  transactions: [],
  transactionHistory: {
    perPage: 100,
    currentPage: 1,
    viewedPages: {},
    transactionCount: 0,
  },
};

const isLoading = (state = initialState.isLoading, { type }) => {
  switch (type) {
    case "@@reactReduxFirebase/LOGIN":
    case "@@reactReduxFirebase/LOGIN_ERROR":
    case "@@reactReduxFirebase/AUTH_EMPTY_CHANGE":
      return false;
    case "@@reactReduxFirebase/AUTHENTICATION_INIT_STARTED":
      return true;
    default:
      return state;
  }
};

const isFetching = (state = initialState.isFetching, { type }) => {
  switch (type) {
    case `${CATEGORIES}_PENDING`:
      return true;
    case `${CATEGORIES}_SUCCESS`:
    case `${CATEGORIES}_FAILURE`:
      return false;
    default:
      return state;
  }
};
const categories = (state = initialState.categories, { type, payload }) => {
  switch (type) {
    case `${CATEGORIES}_SUCCESS`:
      return payload;
    case `ADD_${CATEGORIES}_SUCCESS`:
      return state.concat(payload);
    case `EDIT_${CATEGORIES}_SUCCESS`:
      const nextState = clone(state);

      const changedIndex = nextState.findIndex(
        (item) => item.id === payload.id
      );

      nextState[changedIndex] = payload;

      return nextState;
    case `${CATEGORIES}_PENDING`:
    case `${CATEGORIES}_FAILURE`:
    default:
      return state;
  }
};

const transactions = (state = initialState.transactions, { type, payload }) => {
  switch (type) {
    case `${TRANSACTIONS}_SUCCESS`:
      return payload;
    case `${TRANSACTIONS}_BY_MONTH_SUCCESS`:
      return state.concat(payload);
    case `${TRANSACTIONS}_PENDING`:
    case `${TRANSACTIONS}_FAILURE`:
    default:
      return state;
  }
};

const transactionHistory = (
  state = initialState.transactionHistory,
  { type, payload }
) => {
  switch (type) {
    case SET_CURRENT_PAGE:
      const { currentPage, ...data } = payload;
      return {
        ...state,
        currentPage,
        viewedPages: Object.keys(state.viewedPages).includes(currentPage)
          ? state.viewedPages
          : {
              ...state.viewedPages,
              [currentPage]: data,
            },
      };
    case SET_PER_PAGE:
      return {
        ...state,
        perPage: payload,
      };
    case `PAGINATED_${TRANSACTIONS}_SUCCESS`:
      return {
        ...state,
        viewedPages: {
          ...state.viewedPages,
          [payload.page]: payload.data,
        },
      };
    case `${TRANSACTIONS}_COUNT_SUCCESS`:
      return {
        ...state,
        transactionCount: payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  isLoading,
  categories,
  isFetching,
  transactions,
  transactionHistory,
});
