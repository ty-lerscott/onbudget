import { useReducer } from 'react'

const SET_ERROR = 'SET_ERROR'
const SUBMITTING = 'SUBMITTING'
const SET_FORM_VALUES = 'SET_FORM_VALUES'
const HAS_SUBMITTED_ONCE = 'HAS_SUBMITTED_ONCE'

const initialState = {
	values: {
		firstName: '',
		lastName: '',
		email: ''
	},
	error: '',
	state: {
		isFormDirty: false,
		isSubmitting: false,
		hasSubmittedOnce: false
	}
}

export const getInitialState = importedState => ({
	...initialState,
	...importedState
})

const reducer = (initialState, { type, payload }) => {
	switch (type) {
		case SET_FORM_VALUES:
			return {
				values: {
					...initialState.values,
					...payload
				},
				state: {
					...initialState.state,
					isFormDirty: true
				}
			}
		case SUBMITTING:
			return {
				values: initialState.values,
				state: {
					...initialState.state,
					isSubmitting: payload
				}
			}
		case HAS_SUBMITTED_ONCE:
			return {
				values: initialState.values,
				state: {
					...initialState.state,
					hasSubmittedOnce: true
				}
			}

		default:
			return initialState
	}
}

const RequestAccessState = (importedState = {}) => {
	const [state, dispatch] = useReducer(
		reducer,
		getInitialState(importedState)
	)
	const createAction = type => payload => dispatch({ type, payload })

	return [
		state,
		{
			setError: createAction(SET_ERROR),
			setIsSubmitting: createAction(SUBMITTING),
			setFormValues: createAction(SET_FORM_VALUES),
			setHasSubmittedOnce: createAction(HAS_SUBMITTED_ONCE)
		}
	]
}

export default RequestAccessState
