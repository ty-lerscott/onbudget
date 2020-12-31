import merge from 'deepmerge'

import { initialState as appInitialState } from 'state/AppReducer'
import { initialState as uiInitialState } from 'state/UIReducer'

const getInitialState = (initialState = {}) =>
  merge(
    {
      firebase: {
        auth: {
          isLoaded: false
        }
      },
      app: appInitialState,
      ui: uiInitialState
    },
    initialState
  )

export default getInitialState
