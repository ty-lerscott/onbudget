import { sumTransactions } from "./transactions";

describe("utils/transactions", () => {
  describe("sumTransactions", () => {
    it("returns 0 if not given an array", () => {
      expect(sumTransactions()).toEqual(0);
      expect(sumTransactions([])).toEqual(0);
    });

    it("sums up all amounts given an array of transactions", () => {
      const transactions = [
        { amount: 10 },
        { amount: 20 },
        { amount: "potato" },
      ];
      expect(sumTransactions(transactions)).toEqual(30);
    });
  });
});
