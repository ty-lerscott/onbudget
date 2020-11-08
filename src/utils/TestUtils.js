/* eslint-disable react/forbid-foreign-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import createStore, { getHistory } from "./createStore";
import { ConnectedRouter } from "connected-react-router";

import reducers from "state";

export const TestProvider = ({ children, state }) => {
  const store = createStore({
    reducers,
    initialState: state,
    routes: [],
  });

  return (
    <main className="root">
      <div className="App">
        <div className="App-content">
          <Provider store={store}>
            <ConnectedRouter history={getHistory()}>{children}</ConnectedRouter>
          </Provider>
        </div>
      </div>
    </main>
  );
};

TestProvider.propTypes = {
  state: PropTypes.object,
  children: PropTypes.node,
};

export default TestProvider;
