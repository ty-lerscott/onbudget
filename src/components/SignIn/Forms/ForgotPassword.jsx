import React from "react";
import { TextInput } from "carbon-components-react";

const ForgotPassword = ({
  error,
  setState,
  formValues,
  submittedSuccessfully,
}) => {
  return submittedSuccessfully ? (
    <span className="pending">
      You will receive an email in order to reset your password shortly.
    </span>
  ) : (
    <>
      <p className="cta">Please enter your email address.</p>
      <div className="form">
        <TextInput
          id="email"
          labelText="Email"
          value={formValues.email}
          onChange={setState("email")}
        />
      </div>

      {error && (
        <div className="ErrorWrapper">
          <p className="bx--label error">{error}</p>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
