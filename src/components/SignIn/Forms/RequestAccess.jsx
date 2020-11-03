import React from "react";
import { TextInput } from "carbon-components-react";

const RequestAccess = ({
  error,
  setState,
  formValues,
  submittedSuccessfully,
}) => {
  return submittedSuccessfully ? (
    <span className="pending">
      If approved, you'll get an email shortly to set your password.
    </span>
  ) : (
    <>
      <p className="cta">
        Let me know if you are interested in trying this app out.
      </p>
      <div className="form">
        <div className="Row">
          <TextInput
            id="firstName"
            labelText="First Name"
            value={formValues.firstName}
            onChange={setState("firstName")}
          />
          <TextInput
            id="lastName"
            labelText="Last Name"
            value={formValues.lastName}
            onChange={setState("lastName")}
          />
        </div>
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

export default RequestAccess;
