import React from "react";

import FILTERS from "./utils/filters";

import { Select, SelectItem } from "carbon-components-react";

const CategoryFilter = ({ setFilter }) => {
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

export default CategoryFilter;
