import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import CategoryList from "./CategoryList";
import { TestProvider } from "utils/test/utils";

import categories from "./utils/test/categories";
import { bills, deposits, unplanned } from "./utils/test/CategoryList";

const setup = ({ listProps, providerProps }) => {
  const allProps = {
    notify: jest.fn(),
    editCategory: jest.fn(),
    ...listProps,
  };

  return {
    notify: allProps.notify,
    editCategory: allProps.editCategory,
    selectors: render(
      <TestProvider {...providerProps}>
        <CategoryList {...allProps} />
      </TestProvider>
    ),
  };
};

describe("<CategoryList />", () => {
  it("renders a loading state", () => {
    const {
      selectors: { getAllByTestId },
    } = setup({});

    expect(getAllByTestId("CategorySkeleton")).toHaveLength(6);
  });

  describe("happy paths", () => {
    let notify;
    let selectors;
    let editCategory;

    const beforeEachHelper = () => {
      const rendered = setup({
        listProps: { bills, deposits, unplanned },
        providerProps: {
          state: {
            app: {
              categories,
            },
            ui: {
              dashboard: {
                isLoading: {
                  categoryList: false,
                },
              },
            },
          },
        },
      });

      notify = rendered.notify;
      selectors = rendered.selectors;
      editCategory = rendered.editCategory;
    };

    it("renders the CategoryList properly", () => {
      beforeEachHelper();

      const { queryAllByRole } = selectors;

      expect(queryAllByRole("listitem")).toHaveLength(32);
    });

    describe("filtering", () => {
      beforeEach(beforeEachHelper);

      it("filters bills properly", () => {
        const { getByRole, queryAllByRole, getByText } = selectors;

        fireEvent.change(getByRole("combobox"), { target: { value: "BILLS" } });

        expect(queryAllByRole("listitem")).toHaveLength(15);
        expect(getByText("Rent")).toBeTruthy();
      });

      it("filters deposits properly", async () => {
        const { getByRole, queryAllByRole, getByText } = selectors;

        fireEvent.change(getByRole("combobox"), {
          target: { value: "DEPOSITS" },
        });

        expect(queryAllByRole("listitem")).toHaveLength(1);
        expect(getByText("Income")).toBeTruthy();
      });

      it("filters unplanned properly", async () => {
        const { getByRole, queryAllByRole, getByText } = selectors;

        fireEvent.change(getByRole("combobox"), {
          target: { value: "UNPLANNED" },
        });

        expect(queryAllByRole("listitem")).toHaveLength(16);
        expect(getByText("Target")).toBeTruthy();
      });
    });

    describe("editing category", () => {
      beforeEach(beforeEachHelper);

      it("opens a modal with prefilled inputs", () => {
        const { getByText, getByLabelText, getByDisplayValue } = selectors;

        fireEvent.click(getByText("Income"));

        const nameInput = getByLabelText("Name");

        expect(nameInput).toBeTruthy();
        expect(nameInput.value).toBe("Income");

        const depositCheckbox = getByLabelText("Deposit?");

        expect(depositCheckbox).toBeTruthy();
        expect(depositCheckbox.checked).toBeTrue();
      });

      it("can edit a category", () => {
        const { getByText, getByLabelText, debug, getAllByText } = selectors;

        fireEvent.click(getByText("Income"));

        const nameInput = getByLabelText("Name");
        const depositCheckbox = getByLabelText("Deposit?");

        fireEvent.change(nameInput, { target: { value: "Incomes" } });
        expect(nameInput.value).toBe("Incomes");

        fireEvent.click(depositCheckbox);

        expect(depositCheckbox.checked).toBeFalse();

        // fireEvent.click(getAllByText("Submit")[0]);

        // debug();
        //TODO: mock firebase so I can submit this
      });

      it("clears all fields when clicking secondary button", () => {
        const { getByText, getByLabelText, getAllByText } = selectors;

        fireEvent.click(getByText("Income"));

        const nameInput = getByLabelText("Name");
        const depositCheckbox = getByLabelText("Deposit?");

        fireEvent.change(nameInput, { target: { value: "Incomes" } });

        fireEvent.click(getAllByText("Clear")[0]);

        expect(getByLabelText("Name").value).toBe("");

        expect(depositCheckbox.checked).toBeFalse();
      });

      it("dismounts fields on modal close", async () => {
        const { getByText, getAllByTitle, queryByLabelText } = selectors;

        fireEvent.click(getByText("Income"));

        fireEvent.click(getAllByTitle("Close")[0]);

        await waitFor(() => {
          expect(queryByLabelText("Name")).toBeFalsy();
        });
      });
    });
  });
});
