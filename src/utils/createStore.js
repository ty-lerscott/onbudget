import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { SentryMiddleware } from "middleware";
import { createBrowserHistory } from "history";
import { firestoreReducer } from "redux-firestore";
import { getFirebase, firebaseReducer } from "react-redux-firebase";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";

import api from "./api";

const history = createBrowserHistory({
  basename: "/",
});

export const getHistory = () => history;

const createStoreHelper = ({ reducers, initialState = {}, routes = [] }) => {
  const middlewares = [
    thunk.withExtraArgument({ getFirebase, api }),
    routerMiddleware(history),
    SentryMiddleware,
  ];

  if (process.env.NODE_ENV !== "test") {
    middlewares.push(createLogger());
  }

  return createStore(
    combineReducers({
      router: connectRouter(history),
      firebase: firebaseReducer,
      firestore: firestoreReducer,
      ...reducers,
    }),
    initialState,
    applyMiddleware(...middlewares)
  );
};

export default createStoreHelper;
