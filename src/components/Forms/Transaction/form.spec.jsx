import React from 'react'
import { screen } from '@tsw38/otis'

import { getState, renderWithStore } from '__test__/utils'

import AddTransaction from './form'

const render = ({ props, store } = {}) => {
  const resetParentModal = jest.fn()

  return renderWithStore(
    <AddTransaction
      {...props}
      resetParentModal={resetParentModal}
      isOpen={true}
    />,
    { store: getState(store) }
  )
}

describe('<AddTransactionForm />', () => {
  beforeEach(() => {
    render()
  })

  it('renders correctly', () => {
    const testStrings = ['Amount *', 'Category *', 'Date *', 'Description']

    testStrings.forEach(str => {
      expect(screen.getByLabelText(str)).toBeInTheDocument()
    })
  })
})
