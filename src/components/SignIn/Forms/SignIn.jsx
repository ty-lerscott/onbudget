import React from "react";
import { TextInput } from "carbon-components-react";

const SignInForm = ({ error, formValues, setState, toggleForm, formTypes }) => {
  return (
    <>
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
      <div className="actions">
        <div className="buttonWrapper">
          <button
            className="TextButton"
            onClick={toggleForm(formTypes.request)}
          >
            Request Access
          </button>
        </div>
        <div className="buttonWrapper">
          <button className="TextButton" onClick={toggleForm(formTypes.forgot)}>
            Forgot Password?
          </button>
        </div>
      </div>
      {error && (
        <div className="ErrorWrapper">
          <p className="bx--label error">{error}</p>
        </div>
      )}
    </>
  );
};

export default SignInForm;
