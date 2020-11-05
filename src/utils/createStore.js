import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { getFirebase, firebaseReducer } from "react-redux-firebase";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { firestoreReducer } from "redux-firestore";

import api from "./api";
import { SentryMiddleware } from "../middleware";

export default ({ history, reducers, initial = {}, routes = [] }) => {
  return createStore(
    combineReducers({
      router: connectRouter(history),
      firebase: firebaseReducer,
      firestore: firestoreReducer,
      ...reducers,
    }),
    initial,
    applyMiddleware(
      thunk.withExtraArgument({ getFirebase, api }),
      routerMiddleware(history),
      createLogger(),
      SentryMiddleware
    )
  );
};
