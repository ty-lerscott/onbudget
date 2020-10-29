import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { fetchCategories, fetchExpenses } from "./DashboardActions";

import AddExpense from "../../components/AddExpense/AddExpense";
import MoneySpent from "../../components/MoneySpent/MoneySpent";
import MonthDisplay from "../../components/MonthDisplay/MonthDisplay";
import OverviewChart from "../../components/OverviewChart/OverviewChart";
import ExpenseOverview from "../../components/ExpenseOverview/ExpenseOverview";
import CategoryBreakdown from "../../components/CategoryBreakdown/CategoryBreakdown";
import StackedCategoryChart from "../../components/StackedCategoryChart/StackedCategoryChart";

const Dashboard = ({ expenses, getCategories, getExpenses, categories }) => {
  const memoizedGetExpenses = useRef(() => getExpenses()).current;
  const memoizedGetCategories = useRef(() => getCategories()).current;
  const [month, setMonth] = useState(new Date());

  const [cachedBills, setCachedBills] = useState([]);
  const [cachedExpenses, setCachedExpenses] = useState([]);
  const [cachedDeposits, setCachedDeposits] = useState([]);

  const [billsCategories, setBillsCategories] = useState([]);
  const [depositCategories, setDepositsCategories] = useState([]);
  const [nonBillChargeCategories, setNonBillChargeCategories] = useState([]);

  useEffect(() => {
    memoizedGetExpenses();
    memoizedGetCategories();
  }, [memoizedGetExpenses, memoizedGetCategories]);

  useEffect(() => {
    if (categories.length) {
      setNonBillChargeCategories(
        categories.filter(({ isBill, isDeposit }) => !isBill && !isDeposit)
      );

      setBillsCategories(categories.filter(({ isBill }) => isBill));
      setDepositsCategories(categories.filter(({ isDeposit }) => isDeposit));
    }
  }, [categories]);

  useEffect(() => {
    if (expenses.length) {
      // UNPLANNED EXPENSES
      if (nonBillChargeCategories.length) {
        const categoryIds = nonBillChargeCategories.map(({ id }) => id);

        setCachedExpenses(
          expenses.filter(({ categoryId }) => categoryIds.includes(categoryId))
        );
      }

      // DEPOSITS
      if (depositCategories.length) {
        const categoryIds = depositCategories.map(({ id }) => id);
        setCachedDeposits(
          expenses.filter(({ categoryId }) => categoryIds.includes(categoryId))
        );
      }

      if (billsCategories.length) {
        const categoryIds = billsCategories.map(({ id }) => id);
        setCachedBills(
          expenses.filter(({ categoryId }) => categoryIds.includes(categoryId))
        );
      }
    }
  }, [expenses, nonBillChargeCategories, depositCategories, billsCategories]);

  return (
    <>
      <div className="cashFlow">
        <MoneySpent expenses={cachedExpenses} month={month} />
        <ExpenseOverview
          month={month}
          bills={cachedBills}
          expenses={cachedExpenses}
          deposits={cachedDeposits}
        />
      </div>

      <div className="monthAndAdd">
        <MonthDisplay month={month} setMonth={setMonth} />
        <AddExpense />
      </div>

      <OverviewChart
        categories={categories}
        expenses={cachedExpenses}
        month={month}
      />

      <CategoryBreakdown
        month={month}
        expenses={expenses}
        categories={categories}
      />

      <StackedCategoryChart
        month={month}
        categories={categories}
        expenses={cachedExpenses}
      />
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
