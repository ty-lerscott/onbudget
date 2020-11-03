import React from "react";
import { TextInput } from "carbon-components-react";

const ForgotPassword = ({ error, formValues, setState }) => {
  return (
    <>
      <TextInput
        id="email"
        labelText="Email"
        value={formValues.email}
        onChange={setState("email")}
      />
      {error && (
        <div className="ErrorWrapper">
          <p className="bx--label error">{error}</p>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
