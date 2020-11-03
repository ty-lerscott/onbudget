import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchCategories, fetchTransactions } from "./DashboardActions";

import { getMonthTransactions } from "../../state/selectors/TransactionSelectors";

import MonthDisplay from "../../components/MonthDisplay/MonthDisplay";
import CategoryList from "../../components/CategoryList/CategoryList";
import OverviewChart from "../../components/OverviewChart/OverviewChart";
import AddTransaction from "../../components/AddTransaction/AddTransaction";
import OverallSpending from "../../components/OverallSpending/OverallSpending";
import TransactionOverview from "../../components/TransactionOverview/TransactionOverview";
import StackedCategoryChart from "../../components/StackedCategoryChart/StackedCategoryChart";

const Dashboard = ({
  getCategories,
  getTransactions,
  transactions: { bills, deposits, unplanned },
}) => {
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getTransactions();
    getCategories();
  }, []);
  /* eslint-disable react-hooks/exhaustive-deps */

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
};

const mapStateToProps = (state) => ({
  isFetching: state.app.isFetching,
  transactions: getMonthTransactions(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
