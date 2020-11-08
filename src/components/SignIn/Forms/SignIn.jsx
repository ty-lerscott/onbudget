import React from "react";
import { Link } from "react-router-dom";
import { TextInput } from "carbon-components-react";

const SignInForm = ({ error, formValues, setState }) => {
  const hasRequestedAccess = !!localStorage.getItem("hasRequestedAccess");

  return (
    <>
      <div className="form">
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
      </div>

      {error && (
        <div className="ErrorWrapper">
          <p className="bx--label error">{error}</p>
        </div>
      )}

      <div className="actions">
        {!hasRequestedAccess && (
          <div className="buttonWrapper">
            <Link to="/request-access" className="Link">
              Request Access
            </Link>
          </div>
        )}

        <div className="buttonWrapper">
          <Link to="/forgot-password" className="Link">
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
