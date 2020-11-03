import React from "react";
import cn from "classnames";
import { connect } from "react-redux";

import Card from "../Card/Card";
import Category from "./Category";
import AddCategoryForm from "./AddCategoryForm/AddCategoryForm";

import splitIntoCategories from "./utils/splitIntoCategories";

import "./TransactionsList.scss";

const TransactionsList = ({ classNames, unplanned, categories }) => {
  const combinedCategories = splitIntoCategories(unplanned, categories);

  return (
    <Card
      wrapped
      title="Transaction List"
      className={cn("TransactionsList", classNames)}
    >
      <ul className="Categories">
        {combinedCategories.map((category, id) => (
          <Category key={`Category-${id}`} {...category} />
        ))}
        <AddCategoryForm />
      </ul>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  categories: state.app.categories,
});

export default connect(mapStateToProps)(TransactionsList);
