import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useEffect } from "react";

import View from "views/transaction-history";

import { getTransactionCountAction, fetchTransactions } from "./actions";

import { isAuthenticated } from "state/selectors/UserSelectors";

const TransactionHistory = ({
  perPage,
  isSignedIn,
  viewedPages,
  currentPage,
  getTransactions,
  transactionCount,
  getTransactionCount,
}) => {
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getTransactionCount();
  }, []);
  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    console.warn("viewedPages", viewedPages, "currentPage", currentPage);

    if (!viewedPages[currentPage] && isSignedIn) {
      console.log("gettingtransactions");
      getTransactions({ page: currentPage, limit: perPage });
    }
  }, [currentPage, isSignedIn]);

  const handlePaginate = (direction) => () => {
    // setCurrentPage
  };

  return (
    <View
      perPage={perPage}
      currentPage={currentPage}
      handlePaginate={handlePaginate}
      data={viewedPages[currentPage]}
      transactionCount={transactionCount}
    />
  );
};

TransactionHistory.propTypes = {};

const mapDispatchToProps = {
  getTransactions: fetchTransactions,
  getTransactionCount: getTransactionCountAction,
};

const mapStateToProps = (state) => ({
  isSignedIn: isAuthenticated(state),
  perPage: state.app.transactionHistory.perPage,
  viewedPages: state.app.transactionHistory.viewedPages,
  currentPage: state.app.transactionHistory.currentPage,
  transactionCount: state.app.transactionHistory.transactionCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
