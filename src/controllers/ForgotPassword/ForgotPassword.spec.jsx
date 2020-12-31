import React from 'react'
import { screen, userEvent } from '@tsw38/otis'

import { getState, renderWithStore } from '__test__/utils'

import ForgotPassword from './ForgotPassword'

const setup = ({ store, props } = {}) =>
  renderWithStore(<ForgotPassword {...props} />, { store: getState(store) })

describe('<ForgotPassword', () => {
  it('renders the view', () => {
    setup()

    expect(screen.getByText('Forgot Password')).toBeInTheDocument()
    expect(
      screen.getByText('Please enter your email address', { exact: false })
    ).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('can edit and clear the email', () => {
    setup()

    const emailInput = screen.getByLabelText('Email')

    const expected = {
      email: 'test@gmail.com'
    }

    userEvent.type(emailInput, expected.email)

    expect(emailInput).toHaveDisplayValue(expected.email)

    userEvent.click(screen.getByText('Clear'))

    expect(emailInput).toHaveDisplayValue('')
  })

  //TODO: actually submitting the form
})
