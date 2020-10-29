import React from "react";
import { connect } from "react-redux";

import Dashboard from "./Dashboard";
import Page from "../../components/Page/Page";
import SignInModal from "../../components/SignIn/SignIn";

import { isAuthenticated } from "../../selectors/UserSelectors";
import { hasAppLoaded } from "../../selectors/SessionSelectors";

import "./Home.scss";

const Home = ({ isSignedIn, hasAppLoaded }) =>
  !hasAppLoaded ? null : (
    <Page name="Home">{isSignedIn ? <Dashboard /> : <SignInModal />}</Page>
  );

const mapStateToProps = (state) => ({
  isSignedIn: isAuthenticated(state),
  hasAppLoaded: hasAppLoaded(state),
});

export default connect(mapStateToProps)(Home);
