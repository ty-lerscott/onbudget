import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useEffect } from "react";

import Modal from "components/Modal/Modal";

import Fields from "./fields";
import useFormReducer, { getInitialState } from "./state";

import { enqueueNotification } from "components/NotificationCenter/NotificationActions";

import {
  fetchTransactions,
  addTransactionAction,
} from "actions/TransactionActions";

const modalTitle = "Add Transaction";

const AddTransaction = ({
  notify,
  isOpen,
  addTransaction,
  getTransactions,
  resetParentModal,
}) => {
  const [
    {
      values,
      state: { isModalOpen, isSubmitting, areFieldsMounted },
    },
    { setFormValues, setIsModalOpen, setIsSubmitting, setAreFieldsMounted },
  ] = useFormReducer({ isModalOpen: isOpen });

  /* eslint-disable react-hooks/exhaustive-deps */
  // parent says it's open
  useEffect(() => {
    if (isOpen) {
      setAreFieldsMounted(true);
    }

    setIsModalOpen(isOpen);
  }, [isOpen]);

  // self says it's closed
  useEffect(() => {
    if (!isModalOpen) {
      resetParentModal();
    }
  }, [isModalOpen]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleCloseModal = () => {
    setIsModalOpen(false);

    return;
  };

  const handleSubmitForm = () => {
    setIsSubmitting(true);

    addTransaction(values)
      .then((resp) => {
        if (!resp?.errors) {
          handleCloseModal();
          notify({
            type: "success",
            subtitle: "You successfully added an transaction",
          });

          getTransactions();
          setFormValues(getInitialState().values);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleClearForm = () => {
    setFormValues(getInitialState().values);
  };

  return (
    <Modal
      isScrollable
      title={modalTitle}
      isOpen={isModalOpen}
      isSubmitting={isSubmitting}
      handleCloseModal={handleCloseModal}
      handlePrimaryClick={handleSubmitForm}
      handleSecondaryClick={handleClearForm}
      handleCloseModalComplete={setAreFieldsMounted}
      isDisabled={
        isSubmitting || !values.amount || !values.date || !values.categoryId
      }
    >
      {areFieldsMounted && (
        <Fields setFormValues={setFormValues} formValues={values} />
      )}
    </Modal>
  );
};

AddTransaction.propTypes = {
  notify: PropTypes.func,
  isOpen: PropTypes.bool,
  addTransaction: PropTypes.func,
  getTransactions: PropTypes.func,
  resetParentModal: PropTypes.func,
};

const mapDispatchToProps = {
  notify: enqueueNotification,
  getTransactions: fetchTransactions,
  addTransaction: addTransactionAction,
};

export default connect(null, mapDispatchToProps)(AddTransaction);
