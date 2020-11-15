import PropTypes from 'prop-types'

export default PropTypes.shape({
	category: PropTypes.string,
	id: PropTypes.string.isRequired,
	date: PropTypes.number.isRequired,
	amount: PropTypes.number.isRequired,
	categoryId: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
})
