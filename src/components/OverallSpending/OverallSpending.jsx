import React from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { SkeletonText } from "carbon-components-react";

import toCurrency from "../../utils/currency";
import { sumTransactions } from "../../utils/transactions";

import Card from "../Card/Card";

import "./OverallSpending.scss";

//TODO: proptypes

const OverallSpending = ({ classNames, transactions, isLoading, ...props }) => {
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
      <p className={cn("amount", { isLoading })}>
        {isLoading ? <SkeletonText /> : toCurrency(total)}
      </p>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.ui.dashboard.isLoading.overallSpending,
});

export default connect(mapStateToProps)(OverallSpending);
