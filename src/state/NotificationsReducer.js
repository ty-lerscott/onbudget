export const NOTIFICATION = 'NOTIFICATION'

const initialState = []

const notifications = (state = initialState, { type, payload }) => {
	switch (type) {
		case `${NOTIFICATION}_ENQUEUE`:
			return state.concat(payload)
		case `${NOTIFICATION}_DEQUEUE`:
			return state.slice(1)
		case `${NOTIFICATION}_DELETE`:
			return state.filter(({ id }) => id !== payload)
		default:
			return state
	}
}

export default notifications
