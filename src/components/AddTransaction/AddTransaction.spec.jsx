import React from 'react'
import { screen, userEvent } from '@tsw38/otis'

import { renderWithStore } from '__test__/utils'

import AddTransaction from './AddTransaction'

const setup = props => {
  const allProps = {
    notify: jest.fn(),
    getTransaction: jest.fn(),
    addTransaction: jest.fn(),
    importStatement: jest.fn(),
    ...props
  }

  return renderWithStore(<AddTransaction {...allProps} />)
}

describe('<AddTransaction />', () => {
  beforeEach(() => {
    setup()
  })

  it('renders correctly with the add transaction form type after clicking the right button', async () => {
    const { getByTestId, getByLabelText } = screen

    userEvent.click(getByTestId('OpenModal-AddTransaction'))

    expect(getByLabelText('Amount *')).toBeTruthy()
    expect(getByLabelText('Category *')).toBeTruthy()
    expect(getByLabelText('Date *')).toBeTruthy()
    expect(getByLabelText('Description')).toBeTruthy()
  })

  it('renders correctly with the import transactions form type after clicking the right button', async () => {
    const { getByText, getByTestId } = screen

    userEvent.click(getByTestId('OpenModal-ImportTransactions'))

    expect(getByText('File')).toBeTruthy()
    expect(getByText('Choose a File')).toBeTruthy()
  })
})
