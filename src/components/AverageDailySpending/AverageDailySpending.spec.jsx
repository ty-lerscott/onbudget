import React from 'react'
import { screen } from '@tsw38/otis'

import AverageDailySpending from './AverageDailySpending'

import {
  getState,
  getFixture,
  FIXTURE_NAMES,
  renderWithStore
} from '__test__/utils'

const render = ({ componentProps, store } = {}) => {
  const allProps = {
    dispatch: jest.fn(),
    transactions: [],
    ...componentProps
  }

  return {
    transactions: allProps.transactions,
    selectors: renderWithStore(<AverageDailySpending {...allProps} />, {
      store: getState(store)
    })
  }
}

describe('<AverageDailySpending />', () => {
  it('renders the skeleton text if app is loading', () => {
    render()

    expect(
      screen.getByTestId('AverageDailySpendingSkeleton')
    ).toBeInTheDocument()
  })

  it('renders the sum total spending given an array of transactions', () => {
    render({
      store: {
        firebase: {
          auth: {
            uid: 'tyler.scott.14@gmail.com',
            isLoaded: true,
            isInitializing: false
          }
        },
        ui: {
          dashboard: {
            isLoading: {
              averageDailySpending: false
            }
          }
        }
      },
      componentProps: {
        unplanned: getFixture(FIXTURE_NAMES.transactions).result
      }
    })

    expect(screen.getByText('$5,557.67')).toBeInTheDocument()
  })
})
