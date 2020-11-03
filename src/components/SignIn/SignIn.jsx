import { connect } from "react-redux";
import React, { useState } from "react";
import { Modal } from "carbon-components-react";

import { login as signIn } from "./SignInActions";

import { SignInForm, RequestAccessForm, ForgotPasswordForm } from "./Forms";

import "./SignIn.scss";

const initialFormState = {
  email: "",
  password: "",
};

const formTypes = {
  signIn: "signIn",
  forgot: "forgot",
  request: "request",
};

const SignInModal = ({ login }) => {
  const [error, setError] = useState("");
  const [formType, setFormType] = useState(formTypes.signIn);
  const [formValues, setFormValues] = useState(initialFormState);

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
    login(formValues).catch((err) => {
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
      : "ForgotPassword";

  return (
    <div className="SignIn">
      <Modal
        open
        preventCloseOnClickOutside
        modalHeading={modalHeading}
        aria-label={`${modalHeading} Modal`}
        {...(formTypes === formType.signIn
          ? {
              hasForm: true,
              shouldSubmitOnEnter: true,
              secondaryButtonText: "Clear",
              primaryButtonText: "Sign In",
              onRequestSubmit: handleSubmitForm,
              onSecondarySubmit: handleClearForm,
            }
          : {})}
      >
        <Form
          error={error}
          setState={setState}
          formTypes={formTypes}
          formValues={formValues}
          toggleForm={toggleForm}
        />
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {
  login: signIn,
};

export default connect(null, mapDispatchToProps)(SignInModal);
