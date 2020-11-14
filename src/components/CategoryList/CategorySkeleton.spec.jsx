import React from "react";
import { render } from "@testing-library/react";

import CategorySkeleton from "./CategorySkeleton";

describe("<CategorySkeleton />", () => {
  it("renders properly", () => {
    const { getByRole } = render(<CategorySkeleton />);

    expect(getByRole("listitem")).toBeTruthy();
  });
});
