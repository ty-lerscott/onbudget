import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import AddTransaction from "./AddTransaction";
import { TestProvider } from "utils/TestUtils";

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

  it("renders correctly without form defined", () => {
    const { getAllByRole, queryByTestId } = selectors;

    expect(getAllByRole("button").length).toEqual(5);
    expect(queryByTestId("AddTransactionForm")).toBeFalsy();
    expect(queryByTestId("ImportStatementForm")).toBeFalsy();
  });

  it("renders correctly with the add transaction form type after clicking the right button", async () => {
    const { getByText, findByText, getByTestId } = selectors;

    fireEvent.click(getByText("Add Transaction"));

    await waitFor(() => expect(getByTestId("AddTransactionForm")).toBeTruthy());

    expect(findByText("Add Transaction")).toBeTruthy();
  });

  it("renders correctly with the add transaction form type after clicking the right button", async () => {
    const { getByText, queryAllByText, getByTestId } = selectors;

    fireEvent.click(getByText("Import Statement"));

    await waitFor(() =>
      expect(getByTestId("ImportStatementForm")).toBeTruthy()
    );

    expect(queryAllByText("Import Statement").length).toEqual(2);
  });
});
