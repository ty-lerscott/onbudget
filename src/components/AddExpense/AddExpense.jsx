import React, { useState } from "react";
import { Modal } from "carbon-components-react";

import Card from "../Card/Card";
import AddExpenseForm from "./AddExpenseForm";
import ImportStatementForm from "./ImportStatementForm";

import "./AddExpense.scss";

const AddExpense = () => {
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
    setModalType("");
  };

  const handleSubmitForm = () => {
    console.log("who knos", formValues);
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

export default AddExpense;
