import React from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { InlineLoading } from "carbon-components-react";

import { formatTransactionsForStackedBarGraph } from "state/selectors/TransactionSelectors";

import Card from "components/Card/Card";

import "./StackedCategoryChart.scss";

const StackedCategoryChart = ({ isLoading, chartData }) => {
  return (
    <Card
      wrapped
      centered
      title="Category Breakdown"
      className={cn("StackedCategoryChart", {
        "StackedCategoryChart--Loading": isLoading,
      })}
    >
      {isLoading ? (
        <InlineLoading />
      ) : [...(chartData?.datasets || [])].length ? (
        <Bar
          data={chartData}
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
      ) : null}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  chartData: formatTransactionsForStackedBarGraph(state),
  isLoading: state.ui.dashboard.isLoading.categoryBreakdown,
});

export default connect(mapStateToProps)(StackedCategoryChart);
