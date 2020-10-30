import React from "react";

import "./Category.scss";

const Category = ({ name, quantity, amount }) => (
  <li className="Category">
    <div className="left">
      <span className="title">{name}</span>
      <span className="transactions">
        {quantity} transaction{quantity === 1 ? "" : "s"}
      </span>
    </div>
    <div className="right flex align-center">
      <span className="amount">{amount}</span>
    </div>
  </li>
);

export default Category;
