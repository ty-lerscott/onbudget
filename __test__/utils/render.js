import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { render as rtlRender } from '@tsw38/otis'

import { ConnectedRouter } from 'connected-react-router'

import reducers from 'state'
import createStore, { getHistory } from 'utils/createStore'

// NOTE: not using the redux firebase provider since it has a rerender problem
export const renderWithStore = (
  component,
  { store, ...renderOptions } = {}
) => {
  const initialStore = createStore({
    reducers,
    initialState: store,
    routes: []
  })

  const Wrapper = ({ children }) => (
    <Provider store={initialStore}>
      <ConnectedRouter history={getHistory()}>{children}</ConnectedRouter>
    </Provider>
  )

  Wrapper.propTypes = {
    children: PropTypes.node
  }

  return rtlRender(component, { wrapper: Wrapper, ...renderOptions })
}
