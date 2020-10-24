import React from "react";

import Card from "../Card/Card";

import "./AddExpense.scss";

const AddExpense = () => {
  return (
    <Card small transparent className="AddExpense">
      <button type="button" className="Primary">
        Import Statement
      </button>
      <button type="button">Add Expense</button>
    </Card>
  );
};

export default AddExpense;
