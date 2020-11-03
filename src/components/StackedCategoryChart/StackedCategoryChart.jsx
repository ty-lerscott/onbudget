import React from "react";
import { connect } from "react-redux";

import { formatTransactionsForStackedBarGraph } from "../../state/selectors/TransactionSelectors";

import Card from "../Card/Card";
import { Bar } from "react-chartjs-2";

import "./StackedCategoryChart.scss";

const StackedCategoryChart = ({ chartData }) => {
  return (
    <Card
      wrapped
      centered
      title="Category Breakdown"
      className="StackedCategoryChart"
    >
      {[...(chartData?.datasets || [])].length ? (
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
});

export default connect(mapStateToProps)(StackedCategoryChart);
