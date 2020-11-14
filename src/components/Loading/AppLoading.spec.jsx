import React from "react";
import { render } from "@testing-library/react";

import AppLoading from "./AppLoading";
import { TestProvider } from "utils/test/utils";

const setup = (stateProps) =>
  render(
    <TestProvider {...stateProps}>
      <AppLoading />
    </TestProvider>
  );
describe("<AppLoading />", () => {
  it("When Redux is true - render loading", () => {
    const { getByTestId } = setup();

    expect(getByTestId("AppLoading")).toBeTruthy();
  });

  it("When Redux is false - render nothing", () => {
    const { queryByTestId } = setup({
      state: {
        app: {
          isLoading: false,
        },
      },
    });

    expect(queryByTestId("AppLoading")).toBeFalsy();
  });
});
