import cn from "classnames";
import React, { useState } from "react";
import {
  format,
  addMonths,
  isSameMonth,
  isThisMonth,
  startOfMonth,
} from "date-fns";
import { connect } from "react-redux";

import { ChevronLeft32, ChevronRight32 } from "@carbon/icons-react";

import Card from "components/Card/Card";
import { setMonthAction } from "./MonthDisplayActions";

import "./MonthDisplay.scss";

const MonthDisplay = ({ date, setMonth, classNames, onPreviousClick }) => {
  const [fetchedMonth, setFetchedMonth] = useState([date]);

  if (!date) {
    return null;
  }

  const onNext = () => {
    const nextMonth = addMonths(date, 1);

    setMonth(startOfMonth(nextMonth));
  };

  const onPrevious = () => {
    const previousMonth = addMonths(date, -1);

    setMonth(startOfMonth(previousMonth));

    if (!fetchedMonth.some((month) => isSameMonth(previousMonth, month))) {
      setFetchedMonth(fetchedMonth.concat(previousMonth));

      if (onPreviousClick) {
        onPreviousClick();
      }
    }
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
};

const mapStateToProps = (state) => ({
  date: state.ui.date,
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthDisplay);
