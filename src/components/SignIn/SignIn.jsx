import { connect } from "react-redux";
import React, { useState } from "react";
import { Modal, TextInput } from "carbon-components-react";

import { login as signIn } from "./SignInActions";

import "./SignIn.scss";

const initialFormState = {
  email: "",
  password: "",
};

const SignInModal = ({ login }) => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [error, setError] = useState("");

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
    // console.warn("does this work", formValues);
    login(formValues).catch((err) => {
      setError(err.message);
    });
  };

  return (
    <div className="SignIn">
      <Modal
        open
        hasForm
        shouldSubmitOnEnter
        modalHeading="Sign In"
        aria-label="Sign In Modal"
        primaryButtonText="Sign In"
        secondaryButtonText="Clear"
        preventCloseOnClickOutside
        onRequestSubmit={handleSubmitForm}
        onSecondarySubmit={handleClearForm}
      >
        <TextInput
          id="email"
          labelText="Email"
          value={formValues.email}
          onChange={setState("email")}
        />
        <TextInput
          id="password"
          type="password"
          labelText="Password"
          value={formValues.password}
          onChange={setState("password")}
        />
        {error && (
          <div className="ErrorWrapper">
            <p className="bx--label error">{error}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {
  login: signIn,
};

export default connect(null, mapDispatchToProps)(SignInModal);
