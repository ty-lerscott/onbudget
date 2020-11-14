import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import AddTransaction from "./AddTransaction";
import { TestProvider } from "utils/test/utils";

const setup = (props) => {
  const allProps = {
    notify: jest.fn(),
    getTransaction: jest.fn(),
    addTransaction: jest.fn(),
    importStatement: jest.fn(),
    ...props,
  };

  return render(
    <TestProvider>
      <AddTransaction {...allProps} />
    </TestProvider>
  );
};

describe("<AddTransaction />", () => {
  let selectors;

  beforeEach(() => {
    selectors = setup();
  });

  it("renders correctly with the add transaction form type after clicking the right button", async () => {
    const { getByTestId, queryByLabelText } = selectors;

    fireEvent.click(getByTestId("OpenModal-AddTransaction"));

    expect(queryByLabelText("Amount *")).toBeTruthy();
    expect(queryByLabelText("Category *")).toBeTruthy();
    expect(queryByLabelText("Date *")).toBeTruthy();
    expect(queryByLabelText("Description")).toBeTruthy();
  });

  it("renders correctly with the add transaction form type after clicking the right button", async () => {
    const { getByText, getByTestId } = selectors;

    fireEvent.click(getByTestId("OpenModal-ImportTransactions"));

    await waitFor(() => {
      expect(getByText("File")).toBeTruthy();
      expect(getByText("Choose a File")).toBeTruthy();
    });
  });
});
