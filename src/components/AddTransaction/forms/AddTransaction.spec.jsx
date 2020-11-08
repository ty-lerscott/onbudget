import React from "react";
import { render } from "@testing-library/react";
import AddTransaction from "./AddTransaction";
import { TestProvider } from "utils/TestUtils";

const setup = (props) => {
  return render(
    <TestProvider
      state={{
        app: {
          categories: [],
        },
      }}
    >
      <AddTransaction {...props} />
    </TestProvider>
  );
};

describe("<AddTransaction />", () => {
  it("renders correctly", () => {
    const { getByLabelText } = setup();

    expect(getByLabelText("Amount *")).toBeTruthy();
    expect(getByLabelText("Category *")).toBeTruthy();
    expect(getByLabelText("Date *")).toBeTruthy();
    expect(getByLabelText("Description")).toBeTruthy();
  });
});
