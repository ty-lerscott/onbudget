import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { renderRoutes } from "react-router-config";
import { ConnectedRouter } from "connected-react-router";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import routes from "./routes";
import reducers from "./state";
import createStore, { getHistory } from "./utils/createStore";

import "./styles/index.scss";

const start = () => {
  let initial = {};

  const store = createStore({
    routes,
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

  firebase.initializeApp({
    appId: process.env.REACT_APP_FIREBASE_appId,
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    measurementId: process.env.REACT_APP_FIREBASE_measurementId,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  });

  firebase.firestore();

  Sentry.init({
    dsn:
      "https://700dc73d529244cebcb02cc6e5b2ed77@o472551.ingest.sentry.io/5506363",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

  render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...firebaseProps}>
        <ConnectedRouter history={getHistory()}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
  );
};

start();
