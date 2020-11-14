import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import AddCategoryForm from "./AddCategoryForm";
import { TestProvider } from "utils/TestUtils";

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

  it("mounts the fields when clicking the button", async () => {
    const { queryByTestId, getByRole } = selectors;

    fireEvent.click(getByRole("button", { name: "Add Category" }));

    await waitFor(() => {
      expect(queryByTestId("CategoryFormFields")).toBeTruthy();
    });
  });
});
