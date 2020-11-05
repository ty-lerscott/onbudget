import React from "react";

import { TextInput, Checkbox } from "carbon-components-react";

const CategoryFormFields = ({ formValues, setFormValues }) => {
  const handleSetFormValues = (key) => (e) => {
    setFormValues({ [key]: e?.target?.value || e });
  };

  return (
    <>
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
    </>
  );
};

export default CategoryFormFields;
