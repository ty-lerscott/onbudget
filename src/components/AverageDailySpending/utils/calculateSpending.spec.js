import transactions from '__test-data__/transactions'

import calculateSpending from './calculateSpending'

describe('calculateSpending', () => {
  describe('no transactions', () => {
    it('should return 0 when no transactions are passed', () => {
      expect(calculateSpending()).toEqual(0)
    })
    it('should return 0 when transactions have no length', () => {
      expect(calculateSpending([])).toEqual(0)
    })
  })

  describe('happy path', () => {
    it('should return the correct value', () => {
      const total = calculateSpending(transactions)

      expect(total).toEqual(597.37)
    })
  })
})
