import cn from "classnames";
import { connect } from "react-redux";
import React, { useState } from "react";
import { Modal } from "carbon-components-react";

import {
  loginAction,
  requestAccessAction,
  forgotPasswordAction,
} from "./SignInActions";

import { SignInForm, RequestAccessForm, ForgotPasswordForm } from "./Forms";

import "./SignIn.scss";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const formTypes = {
  signIn: "signIn",
  forgot: "forgot",
  request: "request",
};

const SignInModal = ({ login, requestAccess, forgotPassword }) => {
  const [error, setError] = useState("");
  const [formType, setFormType] = useState(formTypes.signIn);
  const [formValues, setFormValues] = useState(initialFormState);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const setState = (key) => (e) => {
    const nextState = {
      ...formValues,
      [key]: e.target.value,
    };

    setFormValues(nextState);
  };

  const handleClearForm = () => {
    setFormValues(initialFormState);
    setError("");
  };

  const handleSubmitForm = () => {
    const action =
      formType === formTypes.signIn
        ? login
        : formType === formTypes.request
        ? requestAccess
        : forgotPassword;

    const values =
      formType === formTypes.signIn
        ? { email: formValues.email, password: formValues.password }
        : formType === formTypes.request
        ? {
            email: formValues.email,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
          }
        : { email: formValues.email };

    action(values)
      .then((resp) => {
        setError("");
        setSubmittedSuccessfully(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const toggleForm = (toggle) => () => {
    setFormType(toggle);
  };

  const Form =
    formType === formTypes.signIn
      ? SignInForm
      : formType === formTypes.request
      ? RequestAccessForm
      : ForgotPasswordForm;

  const modalHeading =
    formType === formTypes.signIn
      ? "Sign In"
      : formType === formTypes.request
      ? "Request Access"
      : "Forgot Password";

  const submitButton =
    formType === formTypes.signIn
      ? "Sign In"
      : formType === formTypes.request
      ? "Request Access"
      : "Submit";

  return (
    <div
      className={cn("SignIn", `SignIn--${formType}`, {
        "Signin--submitted": submittedSuccessfully,
      })}
    >
      <Modal
        open
        hasForm
        shouldSubmitOnEnter
        preventCloseOnClickOutside
        modalHeading={modalHeading}
        secondaryButtonText="Clear"
        primaryButtonText={submitButton}
        onRequestSubmit={handleSubmitForm}
        onSecondarySubmit={handleClearForm}
        aria-label={`${modalHeading} Modal`}
      >
        <Form
          error={error}
          setState={setState}
          formTypes={formTypes}
          formValues={formValues}
          toggleForm={toggleForm}
          submittedSuccessfully={submittedSuccessfully}
        />
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {
  login: loginAction,
  requestAccess: requestAccessAction,
  forgotPassword: forgotPasswordAction,
};

export default connect(null, mapDispatchToProps)(SignInModal);
