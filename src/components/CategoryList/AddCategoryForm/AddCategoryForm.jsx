import cn from "classnames";
import { connect } from "react-redux";
import React from "react";

import colors from "../../../utils/colors";

import { Add32 } from "@carbon/icons-react";

import Modal from "../../Modal/Modal";

import { addCategoryAction } from "./AddCategoryFormActions";
import { enqueueNotification } from "../../NotificationCenter/NotificationActions";

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
    setAreFieldsMounted(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    return;
  };

  const handleClearForm = () => {
    setFormValues(getInitialState());
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
        setAreFieldsMounted(false);
      });
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
        isDisabled={!values.name.length || isSubmitting}
      >
        {areFieldsMounted && (
          <div className="CategoryFormFields">
            <Fields formValues={values} setFormValues={setFormValues} />
          </div>
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

const mapStateToProps = (state) => ({
  categories: state.app.categories,
});

const mapDispatchToProps = {
  notify: enqueueNotification,
  addCategory: addCategoryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryForm);
