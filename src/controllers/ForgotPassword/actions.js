import { FORGOT_PASSWORD } from 'state/SessionReducer'

export const forgotPasswordAction = ({ email }) => async (
	dispatch,
	getState,
	{ getFirebase, api }
) => {
	dispatch({
		type: `${FORGOT_PASSWORD}_PENDING`
	})

	const firebase = getFirebase()

	return firebase.resetPassword(email).catch(error => {
		throw new Error(error.message)
	})
}
