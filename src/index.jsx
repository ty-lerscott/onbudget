import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { createBrowserHistory } from "history";
import { renderRoutes } from "react-router-config";
import { ConnectedRouter } from "connected-react-router";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebaseConfig from "./configs/firebase";

import routes from "./routes";
import reducers from "./state";
import createStore from "./utils/createStore";

import "./styles/index.scss";

const start = () => {
  let initial = {};
  const history = createBrowserHistory();

  const store = createStore({
    routes,
    history,
    initial,
    reducers,
  });

  const firebaseProps = {
    firebase,
    config: {
      userProfile: "users",
      useFirestoreForProfile: true,
    },
    dispatch: store.dispatch,
    createFirestoreInstance,
  };

  window.onbudget = window.onbudget || store;

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  if (!process.env.REACT_APP_EMULATING) {
    Sentry.init({
      dsn:
        "https://700dc73d529244cebcb02cc6e5b2ed77@o472551.ingest.sentry.io/5506363",
      integrations: [new Integrations.BrowserTracing()],

      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      tracesSampleRate: 1.0,
    });
  }

  render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...firebaseProps}>
        <ConnectedRouter history={history}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
  );
};

start();
