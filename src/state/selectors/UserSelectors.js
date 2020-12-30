import { createSelector } from 'reselect'

import {
  getFirebaseAuth,
  hasFirebaseLoaded,
  hasFirebaseInitialized
} from 'state/selectors/FirebaseSelectors'

export const isAuthenticated = createSelector(
  [hasFirebaseLoaded, hasFirebaseInitialized, getFirebaseAuth],
  (isLoaded, hasInitialized, auth) => {
    if (hasInitialized || !isLoaded) {
      return null
    }

    return !!auth.uid
  }
)
