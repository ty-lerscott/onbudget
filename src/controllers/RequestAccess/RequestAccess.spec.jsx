import React from 'react'
import { waitFor, screen } from '@tsw38/otis'

import RequestAccess from './RequestAccess'

import { renderWithStore, getState } from '__test__/utils'

const render = (store = {}) =>
  renderWithStore(<RequestAccess />, { store: getState(store) })

describe('<RequestAccess>', () => {
  it('renders the view when the user is unauthenticated', () => {
    render()

    expect(screen.getByTestId('Page-RequestAccess')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Let me know if you are interested in trying this app out.'
      )
    ).toBeInTheDocument()
  })

  it('renders nothing if the user is logged in', async () => {
    render({
      firebase: {
        auth: {
          uid: 'tyler.scott.14@gmail.com',
          isLoaded: true,
          isInitializing: false
        }
      }
    })

    await waitFor(() => {
      expect(screen.queryByTestId('Page-RequestAccess')).toBeNull()
    })
  })
})
