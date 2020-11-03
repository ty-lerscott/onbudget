import cn from "classnames";
import { connect } from "react-redux";
import React, { useState } from "react";

import colors from "../../../utils/colors";

import { Add32 } from "@carbon/icons-react";
import { Modal, TextInput, Checkbox } from "carbon-components-react";

import { addCategoryAction } from "./AddCategoryFormActions";
import { enqueueNotification } from "../../NotificationCenter/NotificationActions";

const defaultFormValues = {
  name: "",
  isBill: false,
  isDeposit: false,
};

const AddCategoryForm = ({ notify, categories, addCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);

  const setState = (key) => (value) => {
    const nextState = {
      ...formValues,
      [key]: value,
    };

    setFormValues(nextState);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);

    setTimeout(() => {
      handleClearForm();
    }, 300);
  };

  const handleClearForm = () => {
    setFormValues(defaultFormValues);
  };

  const handleSubmitForm = () => {
    let newColor = "#cccccc";

    if (!formValues.isBill && !formValues.isDeposit) {
      const categoryColors = categories.map(({ color }) => color);

      const [nextColor] = colors.filter((hex) => !categoryColors.includes(hex));

      newColor = nextColor;
    }

    const finalValues = {
      ...formValues,
      color: newColor,
    };

    addCategory(finalValues).then((resp) => {
      if (!resp?.errors) {
        handleCloseModal();
        notify({
          type: "success",
          subtitle: `You have successfully added a the ${formValues.name} category.`,
        });
        setFormValues(defaultFormValues);
      }
    });
  };

  const handleNameChange = (e) => {
    setState("name")(e.target.value);
  };

  const handleToggleCheckbox = (category) => (isChecked = false) => {
    setState(category)(isChecked);
  };

  return (
    <>
      <Modal
        hasForm
        open={isOpen}
        className={cn("AddCategoryForm", { disabled: !formValues.name.length })}
        hasScrollingContent
        primaryButtonText="Submit"
        modalHeading="Add Category"
        secondaryButtonText="Clear"
        aria-label="Add Category Modal"
        onRequestClose={handleCloseModal}
        onRequestSubmit={handleSubmitForm}
        onSecondarySubmit={handleClearForm}
      >
        <div className="AddCategoryForm">
          <div className="Row">
            <TextInput
              id="name"
              labelText="Name"
              autoComplete="off"
              value={formValues.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="Row">
            <Checkbox
              id="isBill"
              labelText="Bill?"
              checked={formValues.isBill}
              onChange={handleToggleCheckbox("isBill")}
            />
            <Checkbox
              id="isDeposit"
              labelText="Deposit?"
              checked={formValues.isDeposit}
              onChange={handleToggleCheckbox("isDeposit")}
            />
          </div>
        </div>
      </Modal>
      <li className="AddCategory">
        <button
          type="button"
          className={cn("Button Primary")}
          onClick={handleOpenModal}
        >
          <Add32 /> Add Category
        </button>
      </li>
    </>
  );
};

const mapStateToProps = (state) => ({
  categories: state.app.categories,
});

const mapDispatchToProps = {
  notify: enqueueNotification,
  addCategory: addCategoryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryForm);
