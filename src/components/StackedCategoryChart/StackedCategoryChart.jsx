import React from "react";
import cn from "classnames";

import expensesToMonth from "./utils/expensesToMonth";

import Card from "../Card/Card";
import { Bar } from "react-chartjs-2";

import "./StackedCategoryChart.scss";

const StackedCategoryChart = ({
  month,
  expenses,
  categories,
  classNames,
  ...props
}) => {
  const data = expensesToMonth({ expenses, categories, month });

  return (
    <Card
      wrapped
      centered
      title="Category Breakdown"
      className={cn("StackedCategoryChart", classNames)}
      {...props}
    >
      <Bar
        data={data}
        options={{
          scales: {
            xAxes: [
              {
                stacked: true,
              },
            ],
            yAxes: [
              {
                stacked: true,
              },
            ],
          },
        }}
      />
    </Card>
  );
};

export default StackedCategoryChart;
