import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Loading } from "carbon-components-react";

import "./AppLoading.scss";

const AppLoading = ({ isLoading }) =>
  isLoading ? (
    <div className="AppLoading" data-testid="AppLoading">
      <Loading withOverlay />
    </div>
  ) : null;

AppLoading.propTypes = {
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
});

export default connect(mapStateToProps)(AppLoading);
