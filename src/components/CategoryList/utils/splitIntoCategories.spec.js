import splitIntoCategories from "./splitIntoCategories";

import categories from "./test/categories";
import expected from "./test/expectedResult";
import transactions from "./test/transactions";

describe("splitIntoCategories", () => {
  describe("incomplete args", () => {
    it("returns an empty array - no args", () => {
      const split = splitIntoCategories();

      expect(split).toHaveLength(0);
    });

    it("returns an empty array - no transactions", () => {
      const split = splitIntoCategories({ categories: [] });

      expect(split).toHaveLength(0);
    });

    it("returns an empty array - no categories", () => {
      const split = splitIntoCategories({ transactions: [] });

      expect(split).toHaveLength(0);
    });
  });

  describe("output", () => {
    const result = splitIntoCategories({ transactions, categories });

    expect(result).toIncludeSameMembers(expected);
  });
});
