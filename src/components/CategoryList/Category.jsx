import React from 'react'
import PropTypes from 'prop-types'

import './Category.scss'

import toCurrency from 'utils/currency'

const Category = ({ name, quantity, total, color, handleOnClick }) => {
	if (!name) {
		return null
	}

	const quantityStr = `${quantity} transaction${quantity === 1 ? '' : 's'}`

	return (
		<li
			className='Category'
			onClick={handleOnClick}
			style={{
				borderLeftColor: color
			}}>
			<div className='left'>
				<span className='title'>{name}</span>
				<span className='transactions'>{quantityStr}</span>
			</div>
			<div className='right flex align-center'>
				<span className='amount'>{toCurrency(total)}</span>
			</div>
		</li>
	)
}

Category.propTypes = {
	name: PropTypes.string,
	total: PropTypes.number,
	color: PropTypes.string,
	quantity: PropTypes.number,
	handleOnClick: PropTypes.func
}

export default Category
