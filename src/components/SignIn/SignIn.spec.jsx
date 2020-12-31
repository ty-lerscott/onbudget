import React from 'react'
import { screen, userEvent, LocalStorageMock } from '@tsw38/otis'

import { getState, renderWithStore } from '__test__/utils'

import SignIn from './SignIn'

const setup = (store = {}, hasRequestedAccess) => {
  return renderWithStore(
    <LocalStorageMock items={{ hasRequestedAccess }}>
      <SignIn />
    </LocalStorageMock>,
    { store: getState(store) }
  )
}

describe('<SignIn />', () => {
  it('renders the signin form properly', () => {
    setup()

    const { getByText, getByRole, getAllByText, getByLabelText } = screen

    expect(getByRole('button', { name: 'Clear' })).toBeInTheDocument()
    expect(getAllByText('Sign In')).toBeArrayOfSize(2)
    expect(getByLabelText('Email')).toBeInTheDocument()
    expect(getByLabelText('Password')).toBeInTheDocument()
    expect(getByText('Request Access')).toBeInTheDocument()
    expect(getByText('Forgot Password?')).toBeInTheDocument()
  })
  it('hides request access if previously requested', () => {
    setup({}, true)

    expect(screen.queryByText('Request Access')).toBeNull()
  })

  it('can fill out and clear the form', () => {
    setup()

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const expected = {
      email: 'test@gmail.com',
      password: 'password'
    }

    userEvent.type(emailInput, expected.email)
    userEvent.type(passwordInput, expected.password)

    expect(emailInput).toHaveDisplayValue(expected.email)
    expect(passwordInput).toHaveValue(expected.password)

    userEvent.click(screen.getByText('Clear'))

    expect(emailInput).toHaveDisplayValue('')
    expect(passwordInput).toHaveValue('')
  })

  //TODO: add sign in test
})
