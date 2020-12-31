import React from 'react'
import { screen, buildFakeModel, fake, sequence } from '@tsw38/otis'

import { getState, renderWithStore } from '__test__/utils'

import OverallSpending from './OverallSpending'
import toCurrency from 'utils/currency'

const buildTransaction = buildFakeModel('Transaction', {
  fields: {
    id: sequence().toString(),
    amount: fake(f => f.random.number()),
    date: new Date().getTime(),
    categoryId: fake(f => f.random.alphaNumeric(10)),
    description: fake(f => f.random.words(10))
  }
})

const state = isLoading => ({
  ui: {
    dashboard: {
      isLoading: {
        overallSpending: isLoading
      }
    }
  }
})

const setup = ({ props, store }) => {
  const allProps = {
    dispatch: jest.fn(),
    transactions: [],
    ...props
  }

  return renderWithStore(<OverallSpending {...allProps} />, {
    store: getState(store)
  })
}

describe('<OverallSpending />', () => {
  it('renders the skeleton text if app is loading', () => {
    setup({
      store: state(true)
    })

    expect(screen.getByTestId('OverallSpendingSkeleton')).toBeInTheDocument()
  })

  it('renders the sum total spending given an array of transactions', () => {
    const transactions = Array(5)
      .fill(null)
      .map(e => buildTransaction())

    setup({
      store: state(false),
      props: {
        transactions
      }
    })

    const totalValue = transactions.reduce((acc, transaction) => {
      acc = acc + transaction.amount

      return acc
    }, 0)

    expect(screen.getByText(toCurrency(totalValue))).toBeInTheDocument()
  })
})
