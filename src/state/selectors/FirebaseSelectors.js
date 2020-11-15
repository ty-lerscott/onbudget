import { createSelector } from 'reselect'

export const getFirebaseAuth = state => state.firebase.auth
export const getIsFirebaseLoaded = state => state.firebase.auth.isLoaded
export const getIsFirebaseInitializing = state =>
	state.firebase.auth.isInitializing

export const hasFirebaseLoaded = createSelector(
	[getIsFirebaseLoaded],
	isFirebaseLoaded => isFirebaseLoaded
)

export const hasFirebaseInitialized = createSelector(
	[getIsFirebaseInitializing],
	isFirebaseInitializing => isFirebaseInitializing
)
