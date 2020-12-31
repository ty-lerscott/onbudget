import { advanceTo, clearDateMock } from '@tsw38/otis'

import { getState, getFixture, FIXTURE_NAMES } from '__test__/utils'
import { formatTransactionsForStackedBarGraph } from './TransactionSelectors'

const expected = {
  datasets: [
    {
      backgroundColor: '#cccccc',
      data: [0, 172.96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Other'
    },
    {
      backgroundColor: '#94c6f7',
      data: [0, 69.08, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Entertainment'
    },
    {
      backgroundColor: '#c694f7',
      data: [0, 8.14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Groceries'
    },
    {
      backgroundColor: '#f79694',
      data: [0, 13.99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Amazon'
    }
  ],
  labels: [
    'Nov 2019',
    'Dec 2019',
    'Jan 2020',
    'Feb 2020',
    'Mar 2020',
    'Apr 2020',
    'May 2020',
    'Jun 2020',
    'Jul 2020',
    'Aug 2020',
    'Sep 2020',
    'Oct 2020'
  ]
}

describe('TransactionSelectors', () => {
  describe('formatTransactionsForStackedBarGraph', () => {
    it('returns null if not provided transactions or categories', () => {
      const result = formatTransactionsForStackedBarGraph({
        app: {},
        ui: {}
      })

      expect(result).toBeNull()
    })

    it('returns the expected data set for the graph', () => {
      advanceTo(new Date(2020, 9, 5))
      const { datasets, labels } = formatTransactionsForStackedBarGraph(
        getState({
          app: {
            categories: getFixture(FIXTURE_NAMES.categories).result,
            transactions: getFixture(FIXTURE_NAMES.transactions).result
          },
          ui: {
            date: new Date()
          }
        })
      )

      expect(datasets).toBeArrayOfSize(16)
      expect(labels).toEqual(expect.arrayContaining(expected.labels))

      clearDateMock()
    })
  })
})
