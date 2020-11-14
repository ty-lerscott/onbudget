import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { InlineLoading } from "carbon-components-react";

import Card from "components/Card/Card";

import formatTransactionsForChart from "./utils/formatTransactionsForChart";

import "./OverviewChart.scss";

import { CategoryProps, TransactionProps } from "definitions";

const OverviewChart = ({ isLoading, unplanned, classNames, categories }) => {
  const data = formatTransactionsForChart(unplanned, categories);

  return (
    <Card
      wrapped
      centered
      title="Overview"
      className={cn("OverviewChart", classNames)}
    >
      {isLoading ? (
        <InlineLoading />
      ) : (
        Array.isArray(data?.datasets?.[0]?.data) && (
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
        )
      )}
    </Card>
  );
};

OverviewChart.propTypes = {
  isLoading: PropTypes.bool,
  classNames: PropTypes.string,
  categories: PropTypes.arrayOf(CategoryProps),
  unplanned: PropTypes.arrayOf(TransactionProps),
};

const mapStateToProps = (state) => ({
  categories: state.app.categories,
  isLoading: state.ui.dashboard.isLoading.overview,
});

export default connect(mapStateToProps)(OverviewChart);
