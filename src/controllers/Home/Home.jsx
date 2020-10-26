import React from "react";
import { connect } from "react-redux";

import Page from "../../components/Page/Page";
import SignInModal from "../../components/SignIn/SignIn";

import { isAuthenticated } from "../../selectors/UserSelectors";
import { hasAppLoaded } from "../../selectors/SessionSelectors";

const Home = ({ isSignedIn, hasAppLoaded }) =>
  !hasAppLoaded ? null : (
    <Page name="Home">{isSignedIn ? "Signed in" : <SignInModal />}</Page>
  );

const mapStateToProps = (state) => ({
  isSignedIn: isAuthenticated(state),
  hasAppLoaded: hasAppLoaded(state),
});

export default connect(mapStateToProps)(Home);
