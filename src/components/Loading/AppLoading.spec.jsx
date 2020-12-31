import React from 'react'
import { screen, waitFor } from '@tsw38/otis'

import { renderWithStore, getState } from '__test__/utils'

import AppLoading from './AppLoading'

const render = (store = {}) =>
  renderWithStore(<AppLoading />, { store: getState(store) })

describe('<AppLoading />', () => {
  it('When Redux is true - render loading', () => {
    render()

    expect(screen.getByTestId('AppLoading')).toBeInTheDocument()
  })

  it('When Redux is false - render nothing', async () => {
    render({
      app: {
        isLoading: false
      }
    })

    await waitFor(() => {
      expect(screen.queryByTestId('AppLoading')).toBeNull()
    })
  })
})
