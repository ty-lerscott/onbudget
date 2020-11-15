import PropTypes from 'prop-types'

export default PropTypes.shape({
	id: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	deleteThisNotification: PropTypes.func,
	type: PropTypes.oneOf(['info', 'success', 'error', 'warning'])
})
