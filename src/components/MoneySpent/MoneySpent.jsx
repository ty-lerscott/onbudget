import React from "react";
import cn from "classnames";
// import format from "date-fns/format";

import sumSpending from "./utils/sumSpending";

import Card from "../Card/Card";

import "./MoneySpent.css";

//TODO: proptypes
//TODO: Credit - (Un)/Planned Expenses instead of just displaying money spent

const MoneySpent = ({ classNames, expenses, categories, month, ...props }) => {
  const moneySpent = sumSpending({ expenses, month });

  return (
    <Card
      className={cn("MoneySpent", classNames)}
      {...props}
      title="Overall Spending"
      centered
      small
      wrapped
    >
      <p className="amount">{moneySpent}</p>
    </Card>
  );
};

export default MoneySpent;
