import React from "react";
import { render } from "@testing-library/react";

import Page from "./Page";

describe("<Page />", () => {
  it("renders the page", () => {
    const { getByTestId, getByText } = render(
      <Page name="test">
        <h1>Hello</h1>
      </Page>
    );
    expect(getByTestId("Page-test")).toBeTruthy();
    expect(getByText("Hello")).toBeTruthy();
  });
});
