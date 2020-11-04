import React, { useState, useEffect } from "react";
import cn from "classnames";
import { connect } from "react-redux";

import Card from "../Card/Card";
import Category from "./Category";
import AddCategoryForm from "./AddCategoryForm/AddCategoryForm";

import { Select, SelectItem } from "carbon-components-react";

import splitIntoCategories from "./utils/splitIntoCategories";

import {
  getBillCategories,
  getDepositCategories,
  getUnplannedCategories,
} from "../../state/selectors/CategorySelectors";

import "./CategoryList.scss";

const FILTERS = {
  ALL: "All",
  BILLS: "Bills",
  DEPOSITS: "Deposits",
  UNPLANNED: "Unplanned",
};

const FilterSet = ({ setFilter }) => {
  const filterCategory = (e) => {
    setFilter(FILTERS[e.target.value]);
  };

  return (
    <Select
      light
      inline
      dir="rtl"
      size="sm"
      labelText="Filter"
      id="CategoryFilters"
      className="CategoryFilters"
      onChange={filterCategory}
    >
      {Object.keys(FILTERS).map((filter, index) => (
        <SelectItem
          value={filter}
          text={FILTERS[filter]}
          key={`filtercategory-${index}`}
        />
      ))}
    </Select>
  );
};

const CategoryList = ({
  bills,
  deposits,
  unplanned,
  classNames,
  categories,
}) => {
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [combinedCategories, setCombinedCategories] = useState([]);

  useEffect(() => {
    setCombinedCategories(
      splitIntoCategories(
        filter === FILTERS.ALL
          ? {
              categories,
              transactions: (bills || [])
                .concat(deposits || [])
                .concat(unplanned || []),
            }
          : filter === FILTERS.BILLS
          ? {
              categories: getBillCategories({ app: { categories } }),
              transactions: bills,
            }
          : filter === FILTERS.DEPOSITS
          ? {
              categories: getDepositCategories({ app: { categories } }),
              transactions: deposits,
            }
          : {
              categories: getUnplannedCategories({ app: { categories } }),
              transactions: unplanned,
            }
      )
    );
  }, [filter, unplanned, deposits, categories, bills]);

  return (
    <Card
      wrapped
      gridContent
      flexContent={false}
      title="Category List"
      className={cn("CategoryList", classNames)}
      optionalContent={<FilterSet setFilter={setFilter} />}
    >
      <ul className="Categories">
        {combinedCategories.map((category, id) => (
          <Category key={`Category-${id}`} {...category} />
        ))}
      </ul>
      <AddCategoryForm />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  categories: state.app.categories,
});

export default connect(mapStateToProps)(CategoryList);
