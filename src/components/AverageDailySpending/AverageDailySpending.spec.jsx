import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import AverageDailySpending from './AverageDailySpending'
import { TestProvider } from 'utils/test/utils'

import transactions from '__test-data__/transactions'

const providerState = isLoading => ({
  state: {
    ui: {
      dashboard: {
        isLoading: {
          averageDailySpending: isLoading
        }
      }
    }
  }
})

const setup = ({ componentProps, providerProps }) => {
  const allProps = {
    dispatch: jest.fn(),
    transactions: [],
    ...componentProps
  }

  return {
    transactions: allProps.transactions,
    selectors: render(
      <TestProvider {...providerProps}>
        <AverageDailySpending {...allProps} />
      </TestProvider>
    )
  }
}

describe('<AverageDailySpending />', () => {
  it('renders the skeleton text if app is loading', () => {
    const {
      selectors: { getByTestId }
    } = setup({
      providerProps: providerState(true)
    })

    expect(getByTestId('AverageDailySpendingSkeleton')).toBeTruthy()
  })

  it('renders the sum total spending given an array of transactions', () => {
    const {
      selectors: { getByText }
    } = setup({
      providerProps: providerState(),
      componentProps: {
        unplanned: transactions
      }
    })

    expect(getByText('$597.37')).toBeTruthy()
  })
})
