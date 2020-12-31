import React from 'react'
import { userEvent, screen, advanceTo, clearDateMock } from '@tsw38/otis'

import MonthDisplay from './MonthDisplay'

import { renderWithStore, getState } from '__test__/utils'

const setup = ({ store, props } = {}) => {
  const componentProps = {
    setMonth: jest.fn(),
    onPreviousClick: jest.fn(),
    ...props
  }

  return {
    props: componentProps,
    selectors: renderWithStore(<MonthDisplay {...componentProps} />, {
      store: getState(
        store || {
          ui: {
            date: new Date()
          }
        }
      )
    })
  }
}

describe('<MonthDisplay />', () => {
  beforeEach(() => {
    advanceTo(new Date(2020, 10, 5))
  })

  afterEach(() => {
    clearDateMock()
  })

  it('renders nothing if there is no date', () => {
    setup({
      store: {
        ui: {
          date: null
        }
      }
    })

    expect(screen.queryByTestId('MonthDisplay')).toBeNull()
  })

  it('renders the month', () => {
    setup({
      store: {
        ui: {
          date: new Date()
        }
      }
    })

    expect(screen.getByTestId('MonthDisplay')).toBeInTheDocument()
    expect(screen.getByText('Nov 2020')).toBeInTheDocument()
  })

  it('next button is unclickable by default', () => {
    setup({
      store: {
        ui: {
          date: new Date()
        }
      }
    })

    expect(screen.getByText('Next Month').closest('button')).toBeDisabled()
    expect(
      screen.getByText('Previous Month').closest('button')
    ).not.toBeDisabled()
  })

  it('changes to previous month when clicking button', () => {
    setup()

    const previousMonth = screen.getByText('Previous Month').closest('button')

    userEvent.click(previousMonth)

    expect(screen.getByText('Oct 2020')).toBeInTheDocument()
  })

  it('changes to next month after clicking previous month', () => {
    setup()

    const previousMonth = screen.getByText('Previous Month').closest('button')
    const nextMonth = screen.getByText('Next Month').closest('button')

    userEvent.click(previousMonth)

    expect(screen.getByText('Oct 2020')).toBeInTheDocument()

    userEvent.click(nextMonth)
    expect(screen.getByText('Nov 2020')).toBeInTheDocument()
  })
})
