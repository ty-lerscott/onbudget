import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Add32 } from "@carbon/icons-react";

import colors from "utils/colors";

import Modal from "components/Modal/Modal";
import { enqueueNotification } from "components/NotificationCenter/NotificationActions";

import { addCategoryAction } from "./AddCategoryFormActions";

import {
  Fields,
  useFormReducer,
  getInitialState,
} from "components/Forms/Category";

const AddCategoryForm = ({ notify, categories, addCategory }) => {
  const [
    {
      values,
      state: { isModalOpen, isSubmitting, areFieldsMounted },
    },
    { setFormValues, setIsModalOpen, setIsSubmitting, setAreFieldsMounted },
  ] = useFormReducer();

  const handleOpenModal = () => {
    handleClearForm();
    setAreFieldsMounted(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    return;
  };

  const handleClearForm = () => {
    setFormValues(getInitialState().values);
  };

  const handleSubmitForm = () => {
    let newColor = "#cccccc";

    if (!values.isBill && !values.isDeposit) {
      const categoryColors = categories.map(({ color }) => color);

      const [nextColor] = colors.filter((hex) => !categoryColors.includes(hex));

      newColor = nextColor;
    }

    const finalValues = {
      ...values,
      color: newColor,
    };

    setIsSubmitting(true);

    addCategory(finalValues)
      .then((resp) => {
        if (!resp?.errors) {
          handleCloseModal();
          notify({
            type: "success",
            subtitle: `You have successfully added a the ${values.name} category.`,
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleDismountFields = () => {
    setAreFieldsMounted(false);
  };

  return (
    <>
      <Modal
        isScrollable
        isOpen={isModalOpen}
        title="Add Category"
        className="AddCategoryModal"
        isSubmitting={isSubmitting}
        handleCloseModal={handleCloseModal}
        handlePrimaryClick={handleSubmitForm}
        handleSecondaryClick={handleClearForm}
        handleCloseModalComplete={handleDismountFields}
        isDisabled={!values.name.length || isSubmitting}
      >
        {areFieldsMounted && (
          <Fields formValues={values} setFormValues={setFormValues} />
        )}
      </Modal>
      <div className="AddCategory">
        <button
          type="button"
          className={cn("Button", "Button--Primary")}
          onClick={handleOpenModal}
        >
          <Add32 /> Add Category
        </button>
      </div>
    </>
  );
};

AddCategoryForm.propTypes = {
  notify: PropTypes.func,
  categories: PropTypes.array,
  addCategory: PropTypes.func,
};

const mapStateToProps = (state) => ({
  categories: state.app.categories,
});

const mapDispatchToProps = {
  notify: enqueueNotification,
  addCategory: addCategoryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryForm);
