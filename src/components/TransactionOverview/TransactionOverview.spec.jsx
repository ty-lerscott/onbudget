import React from 'react'
import { screen, advanceTo, clearDateMock } from '@tsw38/otis'

import {
  getState,
  getFixture,
  FIXTURE_NAMES,
  renderWithStore
} from '__test__/utils'

import TransactionOverview from './TransactionOverview'
import { getMonthTransactions } from 'state/selectors/TransactionSelectors'

const store = isLoading => ({
  app: {
    categories: getFixture(FIXTURE_NAMES.categories).result,
    transactions: getFixture(FIXTURE_NAMES.transactions).result
  },
  ui: {
    date: new Date(),
    dashboard: {
      isLoading: {
        transactionOverview: isLoading
      }
    }
  }
})

const setup = ({ store, props } = {}) =>
  renderWithStore(<TransactionOverview {...props} />, {
    store: getState(store)
  })

describe('<TransactionOverview', () => {
  beforeEach(() => {
    advanceTo(new Date(2020, 10, 5))
  })

  afterEach(() => {
    clearDateMock()
  })
  it('renders in a loading state when app is loading', () => {
    setup({ store: store(true) })

    expect(screen.queryByText('$')).toBeNull()
  })

  it('renders all overviews', () => {
    const state = store(false)

    setup({ store: state, props: getMonthTransactions(state) })

    const textStrings = ['-$2,251.55', '$2,974.48', '$6,897.14']

    textStrings.forEach(str => {
      expect(screen.getByText(str)).toBeInTheDocument()
    })
  })
})
