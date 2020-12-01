/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import createStore, { getHistory } from '../createStore'
import { ConnectedRouter } from 'connected-react-router'

import mockInitializeFirebase from './mockFirebase'

import reducers from 'state'

let hasInitializedFirebase = false

export const TestProvider = ({ children, state }) => {
  const store = createStore({
    reducers,
    initialState: state,
    routes: []
  })

  if (!hasInitializedFirebase) {
    hasInitializedFirebase = true

    const firebase = mockInitializeFirebase(store)

    firebase.initializeApp({
      appId: '123',
      apiKey: '1234',
      projectId: '',
      authDomain: '',
      databaseURL: '',
      storageBucket: '',
      measurementId: '',
      messagingSenderId: ''
    })

    global.Firebase = firebase

    global.Firebase.firestore()
  }

  return (
    <main className='root'>
      <Provider store={store}>
        <ConnectedRouter history={getHistory()}>{children}</ConnectedRouter>
      </Provider>
    </main>
  )
}

TestProvider.propTypes = {
  state: PropTypes.object,
  children: PropTypes.node
}

export default TestProvider
