import { connect } from "react-redux";
import React, { useState } from "react";
import { Modal } from "carbon-components-react";

import Card from "../Card/Card";
import AddTransactionForm from "./AddTransactionForm";
import ImportStatementForm from "./ImportStatementForm";

import {
  addTransactionAction,
  importStatementAction,
} from "./AddTransactionActions";
import { fetchTransactions } from "../../controllers/Home/DashboardActions";
import { enqueueNotification } from "../NotificationCenter/NotificationActions";

import "./AddTransaction.scss";

const AddTransaction = ({
  addTransaction,
  notify,
  getTransactions,
  importStatement,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const isAddModal = modalType === "add";
  const [formValues, setFormValues] = useState({});

  const Form = isAddModal ? AddTransactionForm : ImportStatementForm;

  const modalTitle = isAddModal ? "Add Transaction" : "Import Statement";

  const handleOpenModal = (type) => () => {
    setModalType(type);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);

    setTimeout(() => {
      handleClearForm();
    }, 300);
  };

  const handleClearForm = () => {
    setModalType("");
  };

  const handleSubmitForm = () => {
    // TODO: add import action
    const submitAction = isAddModal ? addTransaction : importStatement;

    submitAction(formValues).then((resp) => {
      if (!resp?.errors) {
        const subtitle = isAddModal
          ? "You successfully added an transaction"
          : "You successfully imported transactions";
        handleCloseModal();
        notify({
          subtitle,
          type: "success",
        });
        getTransactions();
        setFormValues({});
      }
    });
  };

  return (
    <Card small transparent className="AddTransaction">
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
        {!!modalType && (
          <Form setFormValues={setFormValues} formValues={formValues} />
        )}
      </Modal>
      <button
        type="button"
        className="Primary"
        onClick={handleOpenModal("import")}
      >
        Import Statement
      </button>
      <button type="button" onClick={handleOpenModal("add")}>
        Add Transaction
      </button>
    </Card>
  );
};

const mapDispatchToProps = {
  getTransactions: fetchTransactions,
  notify: enqueueNotification,
  addTransaction: addTransactionAction,
  importStatement: importStatementAction,
};

export default connect(null, mapDispatchToProps)(AddTransaction);
