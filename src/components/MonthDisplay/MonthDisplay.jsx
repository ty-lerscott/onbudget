import React from "react";
import cn from "classnames";
import format from "date-fns/format";

import addMonths from "date-fns/addMonths";
import isThisMonth from "date-fns/isThisMonth";

import Card from "../Card/Card";

import "./MonthDisplay.scss";

import { ChevronLeft32, ChevronRight32 } from "@carbon/icons-react";

const MonthDisplay = ({ classNames, month, setMonth }) => {
  if (!month) {
    return null;
  }

  const onPrevious = () => {
    setMonth(addMonths(month, -1));
  };

  const onNext = () => {
    setMonth(addMonths(month, 1));
  };

  const isDisabled = isThisMonth(month);

  return (
    <Card small transparent className={cn("MonthDisplay", classNames)}>
      <div className="wrapper flex centered space-between">
        <button
          type="button"
          onClick={onPrevious}
          className={cn("PreviousMonth")}
        >
          <ChevronLeft32 />
        </button>

        <p className="Month">{format(month, "MMM yyyy")}</p>

        <button
          type="button"
          onClick={onNext}
          disabled={isDisabled}
          className={cn("NextMonth")}
        >
          <ChevronRight32 />
        </button>
      </div>
    </Card>
  );
};

export default MonthDisplay;
