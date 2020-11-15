import { DATE } from 'state/UIReducer'

export const setMonthAction = month => (
	dispatch,
	getState,
	{ getFirebase, api },
	...rest
) => {
	dispatch({
		type: `SET_${DATE}`,
		payload: month
	})
}
