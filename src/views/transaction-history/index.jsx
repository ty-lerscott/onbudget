import React from "react";
import PropTypes from "prop-types";

import { DataTableSkeleton } from "carbon-components-react";

import Page from "components/Page/Page";
import Card from "components/Card/Card";

import "./styles.scss";

const TransactionHistory = (props) => {
  return (
    <Page name="TransactionHistory">
      <Card infinite>
        <DataTableSkeleton zebra showToolbar={false} />
      </Card>
    </Page>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.array,
};

export default TransactionHistory;
