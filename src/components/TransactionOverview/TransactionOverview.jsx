import React from "react";
import cn from "classnames";

import Card from "../Card/Card";

import "./TransactionOverview.scss";

import toCurrency from "../../utils/currency";
import { sumTransactions } from "../../utils/transactions";

//TODO: proptypes

const TransactionOverview = ({
  date,
  bills,
  deposits,
  unplanned,
  classNames,
  ...props
}) => {
  const billsTotal = sumTransactions(bills);
  const depositsTotal = sumTransactions(deposits);
  const unplannedTotal = sumTransactions(unplanned);

  const revenue = depositsTotal - unplannedTotal - billsTotal;

  return (
    <Card
      small
      wrapped
      centered
      spaceBetween
      title="Transaction Overview"
      className={cn("TransactionOverview", classNames)}
      {...props}
    >
      <div className="overviewGroup">
        <span className="title">Revenue</span>
        <span
          className={cn("amount", {
            negative: revenue < 0,
            positive: revenue > 0,
          })}
        >
          {/* TODO: MUST CALCULATE WITH BALANCE AT START OF MONTH */}
          {toCurrency(revenue)}
        </span>
      </div>
      <div className="overviewGroup">
        <span className="title">Unplanned</span>
        <span className="amount">{toCurrency(unplannedTotal)}</span>
      </div>
      <div className="overviewGroup">
        <span className="title">Bills</span>
        <span className="amount">{toCurrency(billsTotal)}</span>
      </div>
    </Card>
  );
};

export default TransactionOverview;
