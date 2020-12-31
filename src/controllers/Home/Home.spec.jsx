import React from 'react'
import { renderWithStore, getState } from '__test__/utils'
import { screen, waitFor, advanceTo, clearDateMock } from '@tsw38/otis'

import Home from './Home'

const render = (store = {}) =>
  renderWithStore(<Home />, { store: getState(store) })

describe('<Home>', () => {
  beforeEach(() => {
    advanceTo(new Date(2020, 10, 5))
  })

  afterEach(() => {
    clearDateMock()
  })

  it('doesnt render if firebase has not loaded', () => {
    render()

    expect(screen.queryByTestId('Page-Home')).toBeFalsy()
  })

  it('shows sign in form if not logged in', () => {
    render({
      firebase: {
        auth: {
          isLoaded: true
        }
      }
    })

    expect(screen.getAllByText('Sign In')).toHaveLength(2)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('shows dashboard when user is logged in', async () => {
    render({
      firebase: {
        auth: {
          uid: 'tyler.scott.14@gmail.com',
          isLoaded: true,
          isInitializing: false
        }
      },
      ui: {
        date: new Date()
      }
    })

    const {
      getByTestId,
      queryByTestId,
      getByLabelText,
      getAllByTestId,
      queryAllByTestId
    } = screen

    expect(getByTestId('Page-Home')).toBeInTheDocument()
    expect(getByTestId('OverallSpending')).toBeInTheDocument()

    expect(getAllByTestId('Card-ContentWrapper')).toBeArrayOfSize(5)
    expect(getAllByTestId('Card')).toBeArrayOfSize(3)
    expect(getByTestId('MonthDisplay')).toBeInTheDocument()
    expect(getByTestId('ImportStatementForm')).toBeInTheDocument()
    expect(getByTestId('OpenModal-ImportTransactions')).toBeInTheDocument()
    expect(getByTestId('OpenModal-AddTransaction')).toBeInTheDocument()

    // OverallSpending
    await waitFor(() => {
      expect(queryByTestId('OverallSpendingSkeleton')).toBeNull()
    })

    expect(getByLabelText('Overall Spending Amount')).toHaveTextContent(
      '$9,871.62'
    )

    // Transaction Overview
    expect(getByLabelText('Revenue Amount')).toHaveTextContent('-$2,251.55')
    expect(getByLabelText('Unplanned Expense Amount')).toHaveTextContent(
      '$2,974.48'
    )
    expect(getByLabelText('Bill Amount')).toHaveTextContent('$6,897.14')

    // AverageDailySpending
    await waitFor(() => {
      expect(queryByTestId('AverageDailySpendingSkeleton')).toBeNull()
    })
    expect(getByLabelText('Average daily spending amount')).toHaveTextContent(
      '$95.95'
    )

    // CategoryList
    await waitFor(() => {
      expect(queryAllByTestId('CategorySkeleton')).toBeArrayOfSize(0)
    })

    expect(getAllByTestId('Category')).toBeArrayOfSize(33)

    // StackedCategoryChart
    await waitFor(() => {
      expect(queryByTestId('CategoryBreakdown-Loading')).toBeNull()
    })
  })
})
