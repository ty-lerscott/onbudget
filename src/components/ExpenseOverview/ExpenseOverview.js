import React from "react";
import cn from "classnames";

import Card from "../Card/Card";
import "./ExpenseOverview.css";

import breakdownExpenses from "./utils/breakdownExpenses";

//TODO: proptypes

const ExpenseOverview = ({ classNames, expenses, balance, ...props }) => {
  const month = new Date();
  const { bills, unplanned } = breakdownExpenses({ expenses, month });

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
        <span className="amount">${balance}</span>
      </div>
      <div className="overviewGroup">
        <span className="title">Expenses</span>
        <span className="amount">${unplanned}</span>
      </div>
      <div className="overviewGroup">
        <span className="title">Planned</span>
        <span className="amount">${bills}</span>
      </div>
    </Card>
  );
};

export default ExpenseOverview;
