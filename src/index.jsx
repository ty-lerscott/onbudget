import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import { renderRoutes } from 'react-router-config'
import { ConnectedRouter } from 'connected-react-router'

import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import routes from './routes'
import reducers from './state'

import initializeFirebase from 'utils/firebase'
import createStore, { getHistory } from 'utils/createStore'

import './styles/index.scss'

const start = () => {
  let initial = {}

  const store = createStore({
    routes,
    initial,
    reducers
  })

  window.onbudget = window.onbudget || store

  Sentry.init({
    dsn:
      'https://700dc73d529244cebcb02cc6e5b2ed77@o472551.ingest.sentry.io/5506363',
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0
  })

  const firebaseProps = initializeFirebase(store)

  render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...firebaseProps}>
        <ConnectedRouter history={getHistory()}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
  )
}

start()
