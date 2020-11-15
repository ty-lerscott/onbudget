import { CATEGORIES } from 'state/AppReducer'

export const editCategoryAction = body => async (
	dispatch,
	getState,
	{ getFirebase, api }
) => {
	dispatch({
		type: `EDIT_${CATEGORIES}_PENDING`
	})

	return api({
		body,
		dispatch,
		getState,
		getFirebase,
		path: 'editCategory'
	}).then(({ editCategory }) => {
		dispatch({
			type: `EDIT_${CATEGORIES}_SUCCESS`,
			payload: body
		})

		return editCategory
	})
}
