import { combineReducers } from "redux";

export const DATE = "DATE";

const now = new Date();

const initialState = {
  date: now,
};

const date = (state = initialState.date, { type, payload }) => {
  switch (type) {
    case `SET_${DATE}`:
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  date,
});
