import merge from 'deepmerge'

import { initialState as uiInitialState } from 'state/UIReducer'
import { initialState as appInitialState } from 'state/AppReducer'
import { initialState as notificationInitialState } from 'state/NotificationsReducer'

const getInitialState = (initialState = {}) =>
  merge(
    {
      firebase: {
        auth: {
          isLoaded: false
        }
      },
      ui: uiInitialState,
      app: appInitialState,
      notifications: notificationInitialState
    },
    initialState
  )

export default getInitialState
