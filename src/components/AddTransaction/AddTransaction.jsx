import cn from "classnames";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";

import Card from "components/Card/Card";
import Modal from "components/Modal/Modal";

import AddTransactionForm from "components/AddTransaction/forms/AddTransaction";
import ImportStatementForm from "components/AddTransaction/forms/ImportStatement";

import { fetchTransactions } from "controllers/Home/DashboardActions";
import { enqueueNotification } from "components/NotificationCenter/NotificationActions";
import {
  addTransactionAction,
  importStatementAction,
} from "components/AddTransaction/AddTransactionActions";

import "./AddTransaction.scss";

const MODAL_TYPES = {
  ADD: "ADD",
  IMPORT: "IMPORT",
};

const INITIAL_FORM_VALUES = {
  [MODAL_TYPES.ADD]: {
    amount: 0,
    date: 0,
    categoryId: "",
    description: "",
  },
  [MODAL_TYPES.IMPORT]: {
    csv: [],
  },
};

const AddTransaction = ({
  notify,
  addTransaction,
  categoriesExist,
  getTransactions,
  importStatement,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formValues, setFormValues] = useState({});
  const [isAddModal, setIsAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const _isAddModal = modalType === MODAL_TYPES.ADD;

    setIsAddModal(_isAddModal);
    setFormValues(
      INITIAL_FORM_VALUES[_isAddModal ? MODAL_TYPES.ADD : MODAL_TYPES.IMPORT]
    );
  }, [modalType]);

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
    setIsSubmitting(true);
    const submitAction = isAddModal ? addTransaction : importStatement;

    submitAction(formValues)
      .then((resp) => {
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
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleDisableState = () => {
    if (isAddModal) {
      return !formValues.amount || !formValues.date;
    }

    return !(formValues.csv || []).length;
  };

  return (
    <Card small transparent className="AddTransaction">
      <Modal
        isScrollable
        isOpen={isOpen}
        isSubmitting={isSubmitting}
        title={modalType && modalTitle}
        handleCloseModal={handleCloseModal}
        handlePrimaryClick={handleSubmitForm}
        handleSecondaryClick={handleClearForm}
        handleCloseModalComplete={handleClearForm}
        isDisabled={isSubmitting || handleDisableState()}
      >
        {!!modalType && (
          <Form setFormValues={setFormValues} formValues={formValues} />
        )}
      </Modal>
      <button
        type="button"
        className={cn("Button", "Button--Primary", {
          "Button--Primary-disabled": !categoriesExist,
        })}
        onClick={handleOpenModal(MODAL_TYPES.IMPORT)}
      >
        Import Statement
      </button>
      <button
        type="button"
        className={cn("Button")}
        onClick={handleOpenModal(MODAL_TYPES.ADD)}
      >
        Add Transaction
      </button>
    </Card>
  );
};

const mapDispatchToProps = {
  notify: enqueueNotification,
  getTransactions: fetchTransactions,
  addTransaction: addTransactionAction,
  importStatement: importStatementAction,
};

const mapStateToProps = (state) => ({
  categoriesExist: !!state.app.categories.length,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
