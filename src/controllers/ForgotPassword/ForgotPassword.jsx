import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { replace } from "connected-react-router";

import View from "views/forgot-password";

import { isAuthenticated } from "state/selectors/UserSelectors";
import { hasFirebaseLoaded } from "state/selectors/FirebaseSelectors";

import { forgotPasswordAction } from "./actions";

import useFormReducer, { getInitialState } from "./state";

const ForgotPassword = ({
  navigate,
  isSignedIn,
  forgotPassword,
  hasFirebaseLoaded,
}) => {
  const [
    { error, state, values },
    { setError, setFormValues, setIsSubmitting, setHasSubmittedOnce },
  ] = useFormReducer(getInitialState());

  useEffect(() => {
    if (hasFirebaseLoaded && isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, hasFirebaseLoaded, navigate]);

  const setState = (key) => (e) => {
    setFormValues({ [key]: e.target.value });
  };

  const handleClearForm = () => {
    setFormValues(getInitialState().values);
  };

  const handleSubmitForm = () => {
    setIsSubmitting(true);
    forgotPassword(values)
      .then(() => {
        setIsSubmitting(false);
        setHasSubmittedOnce();
      })
      .catch((err) => {
        setError(err?.message || err);
      });
  };

  return (
    <View
      error={error}
      values={values}
      setState={setState}
      isSubmitting={state.isSubmitting}
      handleClearForm={handleClearForm}
      handleSubmitForm={handleSubmitForm}
      hasSubmittedOnce={state.hasSubmittedOnce}
      isDisabled={
        state.isSubmitting ||
        Object.values(values).some((value) => !value.length)
      }
    />
  );
};

ForgotPassword.propTypes = {
  navigate: PropTypes.func,
  isSignedIn: PropTypes.bool,
  forgotPassword: PropTypes.func,
  hasFirebaseLoaded: PropTypes.bool,
};

const mapDispatchToProps = {
  navigate: replace,
  forgotPassword: forgotPasswordAction,
};

const mapStateToProps = (state) => ({
  isSignedIn: isAuthenticated(state),
  hasFirebaseLoaded: hasFirebaseLoaded(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
