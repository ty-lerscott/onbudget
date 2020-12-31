import React from 'react'
import { screen } from '@tsw38/otis'

import { renderWithStore, getState } from '__test__/utils'

import ImportStatement from './form'

const setup = ({ props, store } = {}) =>
  renderWithStore(
    <ImportStatement {...props} resetParentModal={jest.fn()} isOpen={true} />,
    { store: getState(store) }
  )

describe('<ImportStatement />', () => {
  it('renders correctly', () => {
    setup()

    const { getByText } = screen

    const textStrings = [
      'Please format the file in this order "date", "description", "debit", "credit", "category"',
      'Only .csv files are accepted.',
      'Choose a File'
    ]

    textStrings.forEach(str => {
      expect(getByText(str)).toBeInTheDocument()
    })
  })
})
