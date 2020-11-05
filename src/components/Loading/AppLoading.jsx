import React from "react";
import { connect } from "react-redux";
import { Loading } from "carbon-components-react";

import "./AppLoading.scss";

const AppLoading = ({ isLoading }) =>
  isLoading ? (
    <div className="AppLoading">
      <Loading withOverlay />{" "}
    </div>
  ) : null;

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
});

export default connect(mapStateToProps)(AppLoading);
