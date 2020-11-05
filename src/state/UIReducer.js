import { combineReducers } from "redux";

export const DATE = "DATE";
export const LOADING_COMPLETE = "LOADING_COMPLETE";

const now = new Date();

const initialState = {
  date: now,
  dashboard: {
    isLoading: {
      overview: true,
      categoryList: true,
      overallSpending: true,
      categoryBreakdown: true,
      transactionOverview: true,
    },
  },
};

const date = (state = initialState.date, { type, payload }) => {
  switch (type) {
    case `SET_${DATE}`:
      return payload;
    default:
      return state;
  }
};

const dashboard = (state = initialState.dashboard, { type, payload }) => {
  switch (type) {
    case `SET_${LOADING_COMPLETE}`:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [payload]: false,
        },
      };
    default:
      return state;
  }
};

export default combineReducers({
  date,
  dashboard,
});
