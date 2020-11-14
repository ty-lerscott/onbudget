import { connect } from "react-redux";
import React, { useEffect } from "react";
import { startOfMonth, addMonths } from "date-fns";

import { fetchCategories } from "actions/CategoryActions";
import {
  fetchTransactions,
  fetchTransactionsByMonth,
} from "actions/TransactionActions";
import { setLoadingComplete } from "./DashboardActions";

import { isAuthenticated } from "state/selectors/UserSelectors";
import {
  getMonthTransactions,
  hasRequestedYearsWorth,
} from "state/selectors/TransactionSelectors";

import MonthDisplay from "components/MonthDisplay/MonthDisplay";
import CategoryList from "components/CategoryList/CategoryList";
import OverviewChart from "components/OverviewChart/OverviewChart";
import AddTransaction from "components/AddTransaction/AddTransaction";
import OverallSpending from "components/OverallSpending/OverallSpending";
import TransactionOverview from "components/TransactionOverview/TransactionOverview";
import StackedCategoryChart from "components/StackedCategoryChart/StackedCategoryChart";

const Dashboard = ({
  thisMonth,
  isSignedIn,
  getCategories,
  getTransactions,
  hasRequestedYear,
  handleLoadingComplete,
  getTransactionsByMonth,
  transactions: { bills, deposits, unplanned },
}) => {
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    Promise.all([getCategories(), getTransactions()]).then(() => {
      [
        "overview",
        "categoryList",
        "overallSpending",
        "categoryBreakdown",
        "transactionOverview",
      ].forEach((area) => {
        handleLoadingComplete(area);
      });
    });
  }, []);

  useEffect(() => {
    if (isSignedIn && !hasRequestedYear) {
      const yearAndOneMonth = startOfMonth(addMonths(thisMonth, -11));
      getTransactionsByMonth(yearAndOneMonth);
    }
  }, [isSignedIn, thisMonth]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <>
      <div className="cashFlow">
        <OverallSpending transactions={bills.concat(unplanned)} />

        <TransactionOverview
          bills={bills}
          deposits={deposits}
          unplanned={unplanned}
        />
      </div>

      <div className="monthAndAdd">
        <MonthDisplay />
        <AddTransaction />
      </div>

      <OverviewChart unplanned={unplanned} />

      <CategoryList bills={bills} deposits={deposits} unplanned={unplanned} />

      <StackedCategoryChart />
    </>
  );
};

const mapDispatchToProps = {
  getCategories: fetchCategories,
  getTransactions: fetchTransactions,
  handleLoadingComplete: setLoadingComplete,
  getTransactionsByMonth: fetchTransactionsByMonth,
};

const mapStateToProps = (state) => ({
  thisMonth: state.ui.date,
  isFetching: state.app.isFetching,
  isSignedIn: isAuthenticated(state),
  transactions: getMonthTransactions(state),
  hasRequestedYear: hasRequestedYearsWorth(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
