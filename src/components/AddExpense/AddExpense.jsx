import { connect } from "react-redux";
import React, { useState } from "react";
import { Modal } from "carbon-components-react";

import Card from "../Card/Card";
import AddExpenseForm from "./AddExpenseForm";
import ImportStatementForm from "./ImportStatementForm";

import { addExpenseAction } from "./AddExpenseActions";
import { fetchExpenses } from "../../controllers/Home/DashboardActions";
import { enqueueNotification } from "../NotificationCenter/NotificationActions";

import "./AddExpense.scss";

const AddExpense = ({ addExpense, notify, getExpenses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const isAddModal = modalType === "add";
  const [formValues, setFormValues] = useState({});

  const Form = isAddModal ? AddExpenseForm : ImportStatementForm;

  const modalTitle = isAddModal ? "Add Expense" : "Import Statement";

  const handleOpenModal = (type) => () => {
    setModalType(type);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleClearForm = () => {
    setModalType("");
  };

  const handleSubmitForm = () => {
    // TODO: add import action
    const submitAction = isAddModal ? addExpense : null;

    submitAction(formValues).then((resp) => {
      if (!resp?.errors) {
        const subtitle = isAddModal
          ? "You successfully added an expense"
          : "You successfully imported expenses";
        handleCloseModal();
        notify({
          subtitle,
          type: "success",
          title: "Success",
        });
        getExpenses();
        setFormValues();
      }
    });
    // console.log("who knos", formValues);
  };

  return (
    <Card small transparent className="AddExpense">
      <Modal
        hasForm
        aria-label={`${modalTitle} Modal`}
        open={isOpen}
        hasScrollingContent
        modalHeading={modalTitle}
        primaryButtonText="Submit"
        secondaryButtonText="Cancel"
        onAnimationEnd={handleClearForm}
        onRequestClose={handleCloseModal}
        onRequestSubmit={handleSubmitForm}
        onSecondarySubmit={handleCloseModal}
      >
        <Form setFormValues={setFormValues} formValues={formValues} />
      </Modal>
      <button
        type="button"
        className="Primary"
        onClick={handleOpenModal("import")}
      >
        Import Statement
      </button>
      <button type="button" onClick={handleOpenModal("add")}>
        Add Expense
      </button>
    </Card>
  );
};

const mapDispatchToProps = {
  getExpenses: fetchExpenses,
  notify: enqueueNotification,
  addExpense: addExpenseAction,
};

export default connect(null, mapDispatchToProps)(AddExpense);
