import React from "react";

import "./Category.scss";

import toCurrency from "../../utils/currency";

const Category = ({ name, quantity, total, color, handleOnClick }) => (
  <li
    className="Category"
    onClick={handleOnClick}
    style={{
      borderLeftColor: color,
    }}
  >
    <div className="left">
      <span className="title">{name}</span>
      <span className="transactions">
        {quantity} transaction{quantity === 1 ? "" : "s"}
      </span>
    </div>
    <div className="right flex align-center">
      <span className="amount">{toCurrency(total)}</span>
    </div>
  </li>
);

export default Category;
