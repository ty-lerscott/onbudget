import React, { useState } from "react";
import cn from "classnames";
import { format, addMonths, isSameMonth, startOfMonth } from "date-fns";
import { connect } from "react-redux";

import { ChevronLeft32, ChevronRight32 } from "@carbon/icons-react";

import Card from "../Card/Card";

import isThisMonth from "date-fns/isThisMonth";
import {
  setMonthAction,
  fetchTransactionsByMonthAction,
} from "./MonthDisplayActions";

import "./MonthDisplay.scss";

const MonthDisplay = ({
  date,
  setMonth,
  classNames,
  fetchTransactionsByMonth,
}) => {
  const [fetchedMonth, setFetchedMonth] = useState([date]);

  if (!date) {
    return null;
  }

  const onNext = () => {
    const nextMonth = addMonths(date, 1);

    setMonth(nextMonth);
  };

  const onPrevious = () => {
    const previousMonth = addMonths(date, -1);

    if (!fetchedMonth.some((month) => isSameMonth(previousMonth, month))) {
      const yearAndOneMonth = startOfMonth(addMonths(previousMonth, -12));

      setFetchedMonth(fetchedMonth.concat(previousMonth));
      fetchTransactionsByMonth(yearAndOneMonth.getTime());
    }

    setMonth(previousMonth);
  };

  const isDisabled = isThisMonth(date);

  return (
    <Card small transparent className={cn("MonthDisplay", classNames)}>
      <div className="wrapper flex centered space-between">
        <button
          type="button"
          onClick={onPrevious}
          className={cn("Button", "PreviousMonth")}
        >
          <ChevronLeft32 />
        </button>

        <p className="Month">{format(date, "MMM yyyy")}</p>

        <button
          type="button"
          onClick={onNext}
          disabled={isDisabled}
          className={cn("Button", "NextMonth")}
        >
          <ChevronRight32 />
        </button>
      </div>
    </Card>
  );
};

const mapDispatchToProps = {
  setMonth: setMonthAction,
  fetchTransactionsByMonth: fetchTransactionsByMonthAction,
};

const mapStateToProps = (state) => ({
  date: state.ui.date,
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthDisplay);
