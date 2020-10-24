import React from "react";
import cn from "classnames";

import Card from "../Card/Card";
import Category from "./Category";

import "./CategoryBreakdown.scss";

import splitIntoCategories from "./utils/splitIntoCategories";

const CategoryBreakdown = ({ classNames, expenses, month, categories }) => {
  const combinedCategories = splitIntoCategories({
    month,
    expenses,
    categories,
  });

  return (
    <Card wrapped className={cn("CategoryBreakdown", classNames)}>
      <ul className="Categories">
        {combinedCategories.map((category, id) => (
          <Category key={`Category-${id}`} {...category} />
        ))}
      </ul>
    </Card>
  );
};

export default CategoryBreakdown;
