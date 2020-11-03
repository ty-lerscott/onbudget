import cn from "classnames";
import { connect } from "react-redux";
import React, { useState } from "react";

import colors from "../../../utils/colors";

import { Add32 } from "@carbon/icons-react";
import { TextInput, Checkbox } from "carbon-components-react";

import Modal from "../../Modal/Modal";

import { addCategoryAction } from "./AddCategoryFormActions";
import { enqueueNotification } from "../../NotificationCenter/NotificationActions";

const defaultFormValues = {
  name: "",
  isBill: false,
  isDeposit: false,
};

const AddCategoryForm = ({ notify, categories, addCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    return;
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

    setIsSubmitting(true);

    addCategory(finalValues)
      .then((resp) => {
        if (!resp?.errors) {
          handleCloseModal();
          notify({
            type: "success",
            subtitle: `You have successfully added a the ${formValues.name} category.`,
          });
          setFormValues(defaultFormValues);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
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
        isScrollable
        isOpen={isOpen}
        title="Add Category"
        className="AddCategoryModal"
        isSubmitting={isSubmitting}
        handleCloseModal={handleCloseModal}
        handlePrimaryClick={handleSubmitForm}
        handleSecondaryClick={handleClearForm}
        handleCloseModalComplete={handleClearForm}
        isDisabled={!formValues.name.length || isSubmitting}
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
