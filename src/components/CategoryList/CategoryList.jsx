import React, { useState, useEffect } from "react";
import cn from "classnames";
import { connect } from "react-redux";

import Card from "../Card/Card";
import Category from "./Category";
import Modal from "../Modal/Modal";
import CategoryFilter from "./CategoryFilter";
import CategorySkeleton from "./CategorySkeleton";
import AddCategoryForm from "./AddCategoryForm/AddCategoryForm";
import { Fields, useFormReducer, getInitialState } from "../forms/Category";

import { editCategoryAction } from "./CategoryListActions";
import { enqueueNotification } from "../NotificationCenter/NotificationActions";

import splitIntoCategories from "./utils/splitIntoCategories";

import {
  getBillCategories,
  getDepositCategories,
  getUnplannedCategories,
} from "../../state/selectors/CategorySelectors";

import "./CategoryList.scss";

import FILTERS from "./utils/filters";

const CategoryList = ({
  bills,
  notify,
  deposits,
  isLoading,
  unplanned,
  classNames,
  categories,
  editCategory,
}) => {
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [combinedCategories, setCombinedCategories] = useState([]);
  const [
    {
      values,
      state: { isModalOpen, isFormDirty, isSubmitting, areFieldsMounted },
    },
    {
      setFormValues,
      setIsFormDirty,
      setIsModalOpen,
      setIsSubmitting,
      setAreFieldsMounted,
    },
  ] = useFormReducer();

  useEffect(() => {
    setCombinedCategories(
      splitIntoCategories(
        filter === FILTERS.ALL
          ? {
              categories,
              transactions: (bills || [])
                .concat(deposits || [])
                .concat(unplanned || []),
            }
          : filter === FILTERS.BILLS
          ? {
              categories: getBillCategories({ app: { categories } }),
              transactions: bills,
            }
          : filter === FILTERS.DEPOSITS
          ? {
              categories: getDepositCategories({ app: { categories } }),
              transactions: deposits,
            }
          : {
              categories: getUnplannedCategories({ app: { categories } }),
              transactions: unplanned,
            }
      )
    );
  }, [filter, unplanned, deposits, categories, bills]);

  const handleCloseModal = () => {
    setIsModalOpen(false);

    return;
  };

  const handleSubmitForm = () => {
    setIsSubmitting(true);

    editCategory(values)
      .then((resp) => {
        if (!resp?.errors) {
          handleCloseModal();
          notify({
            type: "success",
            subtitle: `You have successfully updated a the ${values.name} category.`,
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
        setAreFieldsMounted(false);
      });
  };

  const handleClearForm = () => {
    setFormValues(getInitialState());
  };

  const handleEditCategory = ({ total, quantity, ...category }) => () => {
    setAreFieldsMounted(true);
    setFormValues(category);
    setIsFormDirty(false);
    setIsModalOpen(true);
  };

  const handleUnmountFields = () => {
    setAreFieldsMounted(false);
  };

  return (
    <Card
      wrapped
      gridContent
      flexContent={false}
      title="Category List"
      className={cn("CategoryList", classNames)}
      optionalContent={<CategoryFilter setFilter={setFilter} />}
    >
      <Modal
        isOpen={isModalOpen}
        title="Edit Category"
        isSubmitting={isSubmitting}
        handleCloseModal={handleCloseModal}
        handlePrimaryClick={handleSubmitForm}
        handleSecondaryClick={handleClearForm}
        isDisabled={!isFormDirty || isSubmitting}
        handleCloseModalComplete={handleUnmountFields}
      >
        {areFieldsMounted && (
          <div className="CategoryFormFields">
            <Fields formValues={values} setFormValues={setFormValues} />
          </div>
        )}
      </Modal>
      <ul className="Categories">
        {isLoading
          ? Array(6)
              .fill(CategorySkeleton)
              .map((Component, index) => (
                <Component key={`CategorySkeleton-${index}`} />
              ))
          : combinedCategories.map((category, id) => (
              <Category
                {...category}
                key={`Category-${id}`}
                handleOnClick={handleEditCategory(category)}
              />
            ))}
      </ul>
      <AddCategoryForm />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  categories: state.app.categories,
  isLoading: state.ui.dashboard.isLoading.categoryList,
});

const mapDispatchToProps = {
  notify: enqueueNotification,
  editCategory: editCategoryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
