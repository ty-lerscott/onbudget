import React from 'react'
import { screen, advanceTo, clearDateMock } from '@tsw38/otis'
import { isThisMonth } from 'date-fns'

import {
  getState,
  getFixture,
  FIXTURE_NAMES,
  renderWithStore
} from '__test__/utils'

import TransActionHistory from './TransactionHistory'

const setup = (store = {}) =>
  renderWithStore(<TransActionHistory />, { store: getState(store) })

describe('<TransactionHistory />', () => {
  beforeEach(() => {
    advanceTo(new Date(2020, 10, 5))
  })

  afterEach(() => {
    clearDateMock()
  })

  it('renders the table skeleton if there no transactions passed', () => {
    setup()

    expect(
      screen.getByTestId('TransactionHistoryTable-loading')
    ).toBeInTheDocument()
  })

  it('renders the table empty when given transactions', () => {
    setup({
      app: {
        hasFetchedTransactionsOnce: true,
        transactions: []
      }
    })

    expect(screen.getByTestId('TransactionHistoryTable')).toBeInTheDocument()
    expect(
      screen.getByText("There's no transaction data for this month")
    ).toBeInTheDocument()
  })

  it('renders the table when given transactions', () => {
    const transactions = getFixture(FIXTURE_NAMES.transactions).result

    setup({
      ui: {
        date: new Date()
      },
      app: {
        hasFetchedTransactionsOnce: true,
        categories: getFixture(FIXTURE_NAMES.categories).result,
        transactions: getFixture(FIXTURE_NAMES.transactions).result
      }
    })

    expect(screen.getByText('Date')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()

    const thisMonthTransactions = transactions.filter(transaction =>
      isThisMonth(transaction.date)
    )

    expect(screen.getAllByRole('row')).toBeArrayOfSize(
      thisMonthTransactions.length + 1
    )
  })
})
