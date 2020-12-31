import React from 'react'
import { screen, userEvent, waitFor } from '@tsw38/otis'

import { renderWithStore, getState } from '__test__/utils'

import ImportStatement from './form'

const setup = ({ props, store } = {}) =>
  renderWithStore(<ImportStatement {...props} resetParentModal={jest.fn()} />, {
    store: getState(store)
  })

const getModal = () =>
  screen.getByLabelText('Import Statement Modal', {
    selector: '[role="presentation"]'
  })

describe('<ImportStatement />', () => {
  beforeEach(() => {
    setup({
      props: {
        isOpen: true
      }
    })
  })

  it('renders correctly', () => {
    const textStrings = [
      'Please format the file in this order "date", "description", "debit", "credit", "category"',
      'Only .csv files are accepted.',
      'Choose a File'
    ]

    textStrings.forEach(str => {
      expect(screen.getByText(str)).toBeInTheDocument()
    })
  })

  it('closes import transactions modal when clicking the close button', async () => {
    const modal = getModal()

    expect(modal).toHaveClass('is-visible')

    userEvent.click(
      screen.getByRole('button', {
        name: 'Close'
      })
    )

    await waitFor(() => {
      expect(modal).not.toHaveClass('is-visible')
    })
  })
})
