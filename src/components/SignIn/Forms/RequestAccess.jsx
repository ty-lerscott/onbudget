import React from "react";
import { TextInput } from "carbon-components-react";

const RequestAccess = ({ error, formValues, setState }) => {
  return (
    <>
      <p className="CTA">
        Let me know if you are interested in trying this out
      </p>
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
      {error && (
        <div className="ErrorWrapper">
          <p className="bx--label error">{error}</p>
        </div>
      )}
    </>
  );
};

export default RequestAccess;
