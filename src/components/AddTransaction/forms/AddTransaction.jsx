import React from "react";
import clone from "clone-deep";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Select,
  TextInput,
  SelectItem,
  DatePicker,
  NumberInput,
  DatePickerInput,
} from "carbon-components-react";

import { CategoryProps } from "definitions";

import "./AddTransaction.scss";

const AddTransactionForm = ({ formValues, setFormValues, categories }) => {
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

  const handleDateChange = (args) => {
    let date;
    // this is a DatePicker calendar select
    if (Array.isArray(args)) {
      date = args[0];
    } else {
      date = new Date(args.target.value);
    }

    setState("date")(date.getTime());
  };

  const handleDescriptionChange = (e) => {
    setState("description")(e.target.value);
  };

  const sortedCategories = () => {
    let unsortedCategories = clone(categories);

    unsortedCategories.sort((a, b) => (a.name > b.name ? 1 : -1));

    return unsortedCategories;
  };

  return (
    <div className="AddTransactionForm">
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
        <Select
          light
          id="category"
          label="Category"
          placeholder="Filter..."
          className="CategoryDropdown"
        >
          {sortedCategories().map((category, index) => (
            <SelectItem
              key={`Select-option-${index}`}
              value={category.id}
              text={category.name}
            />
          ))}
        </Select>

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

AddTransactionForm.propTypes = {
  formValues: PropTypes.object,
  setFormValues: PropTypes.func,
  categories: PropTypes.arrayOf(CategoryProps),
};

const mapStateToProps = (state) => ({
  categories: state.app.categories,
});

export default connect(mapStateToProps)(AddTransactionForm);