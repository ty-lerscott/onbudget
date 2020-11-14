import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import AddTransaction from "./form";
import { TestProvider } from "utils/test/utils";

const setup = (props) => {
  const resetParentModal = jest.fn();

  return render(
    <TestProvider
      state={{
        app: {
          categories: [],
        },
      }}
    >
      <AddTransaction
        {...props}
        resetParentModal={resetParentModal}
        isOpen={true}
      />
    </TestProvider>
  );
};

describe("<AddTransactionForm />", () => {
  let selectors;

  beforeEach(() => {
    selectors = setup();
  });

  it("renders correctly", () => {
    const { getByLabelText } = selectors;

    expect(getByLabelText("Amount *")).toBeTruthy();
    expect(getByLabelText("Category *")).toBeTruthy();
    expect(getByLabelText("Date *")).toBeTruthy();
    expect(getByLabelText("Description")).toBeTruthy();
  });
});
