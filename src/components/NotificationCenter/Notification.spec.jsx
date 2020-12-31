import React from 'react'
import { screen, userEvent } from '@tsw38/otis'

import { renderWithStore, getState } from '__test__/utils'

import Notification from './Notification'

const setup = store => {
  const props = {
    id: '1',
    subtitle: 'Notification subtitle',
    type: 'success',
    isRequired: {} //TODO: what is this
  }

  return {
    props,
    selectors: renderWithStore(<Notification {...props} />, {
      store: getState(store)
    })
  }
}

describe('<Notification />', () => {
  it('renders as expected', () => {
    const { props } = setup()
    expect(screen.getByText(props.subtitle)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { text: props.type, exact: false })
    ).toBeInTheDocument()
  })

  it('closes the notification when clicking close icon', () => {
    setup()

    userEvent.click(screen.getByRole('button'))

    expect(screen.queryByRole('alert')).toBeNull()
  })
})
