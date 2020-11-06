import React from "react";
import { connect } from "react-redux";

import Dashboard from "./Dashboard";
import Page from "components/Page/Page";
import SignInModal from "components/SignIn/SignIn";

import { isAuthenticated } from "state/selectors/UserSelectors";
import { hasFirebaseLoaded } from "state/selectors/FirebaseSelectors";

import "./Home.scss";

const Home = ({ isSignedIn, hasFirebaseLoaded }) =>
  !hasFirebaseLoaded ? null : (
    <Page name="Home">{isSignedIn ? <Dashboard /> : <SignInModal />}</Page>
  );

const mapStateToProps = (state) => ({
  isSignedIn: isAuthenticated(state),
  hasFirebaseLoaded: hasFirebaseLoaded(state),
});

export default connect(mapStateToProps)(Home);
