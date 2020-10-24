import React from "react";
import cn from "classnames";

import Card from "../Card/Card";

import "./CategoryBreakdown.scss";

import splitIntoCategories from "./utils/splitIntoCategories";

const CategoryBreakdown = ({ classNames, expenses, month, categories }) => {
  const comhinedCategories = splitIntoCategories({
    expenses,
    categories,
    month,
  });

  console.log({ comhinedCategories });

  return <Card wrapped className={cn("CategoryBreakdown", classNames)}></Card>;
};

export default CategoryBreakdown;
