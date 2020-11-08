import React from "react";
import { render } from "@testing-library/react";

import ImportStatement from "./ImportStatement";
import { TestProvider } from "utils/TestUtils";

const setup = (props) => {
  return render(
    <TestProvider>
      <ImportStatement {...props} />
    </TestProvider>
  );
};

describe("<ImportStatement />", () => {
  it("renders correctly", () => {
    const { getByText } = setup();

    const testString = {
      labelText: `Please format the file in this order "date", "description", "debit", "credit", "category"`,
      description: "Only .csv files are accepted.",
      chooseFile: "Choose a File",
    };

    expect(getByText(testString.labelText)).toBeTruthy();
    expect(getByText(testString.description)).toBeTruthy();
    expect(getByText(testString.chooseFile)).toBeTruthy();
  });
});
