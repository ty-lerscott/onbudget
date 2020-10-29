import React from "react";
import cn from "classnames";

import Card from "../Card/Card";
import "./ExpenseOverview.css";

import forThisMonth from "./utils/forThisMonth";

//TODO: proptypes

const ExpenseOverview = ({
  classNames,
  expenses,
  deposits,
  bills,
  month,
  ...props
}) => {
  const income = forThisMonth(deposits, month);
  const unplanned = forThisMonth(expenses, month);
  const billsForMonth = forThisMonth(bills, month);

  return (
    <Card
      className={cn("ExpenseOverview", classNames)}
      {...props}
      title="Expense Overview"
      small
      wrapped
      centered
      spaceBetween
    >
      <div className="overviewGroup">
        <span className="title">Balance</span>
        <span className="amount">${income - unplanned - billsForMonth}</span>
      </div>
      <div className="overviewGroup">
        <span className="title">Expenses</span>
        <span className="amount">${unplanned}</span>
      </div>
      <div className="overviewGroup">
        <span className="title">Planned</span>
        <span className="amount">${billsForMonth}</span>
      </div>
    </Card>
  );
};

export default ExpenseOverview;
