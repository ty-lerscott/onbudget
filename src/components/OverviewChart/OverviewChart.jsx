import React from "react";
import cn from "classnames";

import normalizeData from "./utils/normalizeData";

import Card from "../Card/Card";
import { Doughnut } from "react-chartjs-2";

import "./OverviewChart.css";

//TODO: proptypes

const OverviewChart = ({
  classNames,
  expenses,
  categories,
  month,
  ...props
}) => {
  const data = normalizeData({ expenses, categories, month });

  return (
    <Card
      wrapped
      centered
      title="Overview"
      className={cn("OverviewChart", classNames)}
      {...props}
    >
      <Doughnut
        options={{
          width: "90%",
          cutoutPercentage: 75,
          circumference: Math.PI,
          rotation: Math.PI,
          legend: {
            display: false,
          },
        }}
        data={data}
      />
    </Card>
  );
};

export default OverviewChart;
