import React from "react";
import { render, fireEvent } from "@testing-library/react";

import MonthDisplay from "./MonthDisplay";
import { TestProvider } from "utils/test/utils";

const setup = ({ stateProps, componentProps } = {}) => {
  const props = {
    setMonth: jest.fn(),
    onPreviousClick: jest.fn(),
    ...componentProps,
  };

  return {
    props,
    selectors: render(
      <TestProvider {...stateProps}>
        <MonthDisplay {...props} />
      </TestProvider>
    ),
  };
};

describe("<MonthDisplay />", () => {
  it("renders nothing if there is no date", () => {
    const {
      selectors: { queryByTestId },
    } = setup({
      stateProps: {
        state: {
          ui: {
            date: null,
          },
        },
      },
    });
    expect(queryByTestId("MonthDisplay")).toBeFalsy();
  });

  it("renders the month", () => {
    const {
      selectors: { getByTestId, getByText },
      props,
    } = setup();
    expect(getByTestId("MonthDisplay")).toBeTruthy();
    expect(getByText("Oct 2020")).toBeTruthy();
  });

  it("next button is unclickable by default", () => {
    const {
      selectors: { getByText },
    } = setup();

    expect(getByText("Next Month").closest("button")).toBeDisabled();
    expect(getByText("Previous Month").closest("button")).not.toBeDisabled();
  });

  it("changes to previous month when clicking button", () => {
    const {
      selectors: { getByText },
    } = setup();

    const previousMonth = getByText("Previous Month").closest("button");

    fireEvent.click(previousMonth);

    expect(getByText("Sep 2020")).toBeTruthy();
  });

  it("changes to next month after clicking previous month", () => {
    const {
      selectors: { getByText },
    } = setup();

    const previousMonth = getByText("Previous Month").closest("button");
    const nextMonth = getByText("Next Month").closest("button");

    fireEvent.click(previousMonth);

    expect(getByText("Sep 2020")).toBeTruthy();

    fireEvent.click(nextMonth);
    expect(getByText("Oct 2020")).toBeTruthy();
  });
});
