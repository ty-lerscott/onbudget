import React from "react";
import cn from "classnames";

import toCurrency from "../../utils/currency";
import { sumTransactions } from "../../utils/transactions";

import Card from "../Card/Card";

import "./OverallSpending.scss";

//TODO: proptypes

const OverallSpending = ({ classNames, transactions, ...props }) => {
  const total = sumTransactions(transactions);

  return (
    <Card
      small
      wrapped
      centered
      title="Overall Spending"
      className={cn("OverallSpending", classNames)}
      {...props}
    >
      <p className="amount">{toCurrency(total)}</p>
    </Card>
  );
};

export default OverallSpending;
