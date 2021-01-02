import { advanceTo, clearDateMock } from '@tsw38/otis'
import { getFixture, FIXTURE_NAMES } from '__test__/utils'

import calculateSpending from './calculateSpending'

describe('calculateSpending', () => {
  beforeEach(() => {
    advanceTo(new Date(2020, 10, 5))
  })

  afterEach(() => {
    clearDateMock()
  })

  describe('no transactions', () => {
    it('should return 0 when no transactions are passed', () => {
      expect(calculateSpending()).toEqual(0)
    })

    it('should return 0 when transactions have no length', () => {
      expect(
        calculateSpending({
          date: new Date(),
          transactions: []
        })
      ).toEqual(0)
    })
  })

  describe('happy path', () => {
    it('should return the correct value', () => {
      const total = calculateSpending({
        date: new Date(),
        transactions: getFixture(FIXTURE_NAMES.transactions).result
      })

      expect(Math.floor(total)).toEqual(34457)
    })
  })
})
