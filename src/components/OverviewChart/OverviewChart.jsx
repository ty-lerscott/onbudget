import React from "react";
import cn from "classnames";

import formatTransactionsForChart from "./utils/formatTransactionsForChart";

import Card from "../Card/Card";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";

import "./OverviewChart.scss";

//TODO: proptypes

const OverviewChart = ({ unplanned, classNames, categories }) => {
  const data = formatTransactionsForChart(unplanned, categories);

  return (
    <Card
      wrapped
      centered
      title="Overview"
      className={cn("OverviewChart", classNames)}
    >
      {Array.isArray(data?.datasets?.[0]?.data) && (
        <Doughnut
          options={{
            cutoutPercentage: 75,
            circumference: Math.PI,
            rotation: Math.PI,
            legend: {
              display: false,
            },
          }}
          data={data}
        />
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  categories: state.app.categories,
});

export default connect(mapStateToProps)(OverviewChart);
