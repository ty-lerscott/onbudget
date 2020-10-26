import React from "react";
import {
  ComboBox,
  TextInput,
  DatePicker,
  NumberInput,
  DatePickerInput,
} from "carbon-components-react";

import { categories as allCategories } from "../../data";

const categories = [...new Set(allCategories.map(({ id }) => id))].map((id) =>
  allCategories.find((category) => category.id === id)
);

const AddExpenseForm = ({ formValues, setFormValues }) => {
  const categoriesToString = (category) => category?.name || "";

  const setState = (key) => (value) => {
    const nextState = {
      ...formValues,
      [key]: isNaN(value) ? value : Number(value),
    };

    setFormValues(nextState);
  };

  const handleAmountChange = (e) => {
    setState("amount")(e.target.value);
  };

  const handleChangeCategory = ({ selectedItem }) => {
    setState("category")(Number(selectedItem.id));
  };

  const handleDateChange = (args) => {
    let date;
    // this is a DatePicker calendar select
    if (Array.isArray(args)) {
      date = args[0].getDate();
    } else {
      date = new Date(args?.target?.value);
    }

    setState("date")(date);
  };

  const handleDescriptionChange = (e) => {
    setState("description")(e.target.value);
  };

  return (
    <div className="AddExpenseForm">
      <div className="Row">
        <NumberInput
          id="amount"
          label="Amount *"
          allowEmpty={false}
          onChange={handleAmountChange}
          invalidText="Please provide a valid amount"
        />
      </div>
      <div className="flex space-between split no-flex">
        <ComboBox
          light
          id="category"
          label="Category"
          items={categories}
          titleText="Category"
          placeholder="Filter..."
          className="CategoryDropdown"
          onChange={handleChangeCategory}
          itemToString={categoriesToString}
        />

        <DatePicker datePickerType="single" onChange={handleDateChange}>
          <DatePickerInput
            required
            id="paidOn"
            labelText="Date *"
            placeholder="MM/DD/YYYY"
            onChange={handleDateChange}
            autoComplete={"off"}
          />
        </DatePicker>
      </div>
      <div className="Row">
        <TextInput
          id="description"
          labelText="Description"
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default AddExpenseForm;
