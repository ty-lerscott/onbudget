import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import AddCategoryForm from "./AddCategoryForm";
import { TestProvider } from "utils/test/utils";

const categories = [];

const setup = (props) => {
  const allProps = {
    categories,
    notify: jest.fn(),
    addCategory: jest.fn(),
    ...props,
  };

  return render(
    <TestProvider>
      <AddCategoryForm {...allProps} />
    </TestProvider>
  );
};

describe("<AddCategoryForm />", () => {
  let selectors;

  beforeEach(() => {
    selectors = setup();
  });

  it("on initial render, fields arent mounted in modal", () => {
    const { queryByTestId } = selectors;

    expect(queryByTestId("CategoryFormFields")).toBeFalsy();
  });

  it("renders fields after clicking button", () => {
    const { debug, queryByTestId, getByRole } = selectors;

    fireEvent.click(getByRole("button", { name: "Add Category" }));

    expect(queryByTestId("CategoryFormFields")).toBeTruthy();
  });
});
