import React from "react";
import PropTypes from "prop-types";

import { TextInput, Checkbox } from "carbon-components-react";

const CategoryFormFields = ({ formValues, setFormValues }) => {
  const handleSetFormValues = (key) => (e) => {
    setFormValues({ [key]: typeof e === "boolean" ? e : e.target.value });
  };

  return (
    <div className="CategoryFormFields" data-testid="CategoryFormFields">
      <div className="Row">
        <TextInput
          id="name"
          labelText="Name"
          autoComplete="off"
          value={formValues.name}
          onChange={handleSetFormValues("name")}
        />
      </div>
      <div className="Row">
        <Checkbox
          id="isBill"
          labelText="Bill?"
          checked={formValues.isBill}
          onChange={handleSetFormValues("isBill")}
        />
        <Checkbox
          id="isDeposit"
          labelText="Deposit?"
          checked={formValues.isDeposit}
          onChange={handleSetFormValues("isDeposit")}
        />
      </div>
    </div>
  );
};

CategoryFormFields.propTypes = {
  setFormValues: PropTypes.func,
  formValues: PropTypes.shape({
    name: PropTypes.string,
    isBill: PropTypes.bool,
    isDeposit: PropTypes.bool,
  }),
};

export default CategoryFormFields;
