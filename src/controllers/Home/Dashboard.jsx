import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { fetchCategories, fetchExpenses } from "./DashboardActions";

import MoneySpent from "../../components/MoneySpent/MoneySpent";

const Dashboard = ({ expenses, getCategories, getExpenses }) => {
  const memoizedGetExpenses = useRef(() => getExpenses()).current;
  const memoizedGetCategories = useRef(() => getCategories()).current;
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    memoizedGetExpenses();
  }, [memoizedGetExpenses]);

  useEffect(() => {
    memoizedGetCategories();
  }, [memoizedGetCategories]);

  return (
    <>
      <div className="cashFlow">
        <MoneySpent expenses={expenses} month={month} />
      </div>
    </>
  );
};

const mapDispatchToProps = {
  getExpenses: fetchExpenses,
  getCategories: fetchCategories,
};

const mapStateToProps = (state) => ({
  expenses: state.app.expenses,
  isFetching: state.app.isFetching,
  categories: state.app.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
