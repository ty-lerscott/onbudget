import cn from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useState } from "react";

import Card from "components/Card/Card";

import { TransactionForm } from "components/Forms/Transaction";
import { ImportStatementForm } from "components/Forms/ImportStatement";

import { fetchTransactions } from "actions/TransactionActions";
import { enqueueNotification } from "components/NotificationCenter/NotificationActions";

import "./AddTransaction.scss";

const MODAL_TYPES = {
  ADD: "ADD",
  IMPORT: "IMPORT",
};

const AddTransaction = ({ categoriesExist }) => {
  const [modalType, setModalType] = useState("");

  const handleOpenModal = (type) => () => {
    setModalType(type);
  };

  const handleClearForm = () => {
    setModalType("");
  };

  return (
    <Card small transparent className="AddTransaction">
      <TransactionForm
        isOpen={modalType === MODAL_TYPES.ADD}
        resetParentModal={handleClearForm}
      />
      <ImportStatementForm
        isOpen={modalType === MODAL_TYPES.IMPORT}
        resetParentModal={handleClearForm}
      />
      <button
        type="button"
        data-testid="OpenModal-ImportTransactions"
        onClick={handleOpenModal(MODAL_TYPES.IMPORT)}
        className={cn("Button", "Button--Primary", {
          "Button--Primary-disabled": !categoriesExist,
        })}
      >
        Import Statement
      </button>
      <button
        type="button"
        className={cn("Button")}
        onClick={handleOpenModal(MODAL_TYPES.ADD)}
        data-testid="OpenModal-AddTransaction"
      >
        Add Transaction
      </button>
    </Card>
  );
};

AddTransaction.propTypes = {
  notify: PropTypes.func,
  categoriesExist: PropTypes.bool,
  getTransactions: PropTypes.func,
};

const mapDispatchToProps = {
  notify: enqueueNotification,
  getTransactions: fetchTransactions,
};

const mapStateToProps = (state) => ({
  categoriesExist: !!state.app.categories.length,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
