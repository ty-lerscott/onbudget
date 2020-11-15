import React from 'react'
import clone from 'clone-deep'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	Select,
	TextInput,
	SelectItem,
	DatePicker,
	NumberInput,
	DatePickerInput
} from 'carbon-components-react'

import { CategoryProps } from 'definitions'

import './fields.scss'

const FIELD_IDS = {
	date: 'date',
	amount: 'amount',
	categoryId: 'categoryId',
	description: 'description'
}

const TransactionFormFields = ({ formValues, setFormValues, categories }) => {
	const handleSetFormValues = key => e => {
		let value

		switch (key) {
			case 'date':
				value = Array.isArray(e) ? e[0] : new Date(e.target.value)
				break
			case 'amount':
			case 'categoryId':
			case 'description':
				value = e.target.value
				break
			default:
				break
		}

		setFormValues({ [key]: value })
	}

	const sortedCategories = () => {
		let unsortedCategories = clone(categories)

		unsortedCategories.sort((a, b) => (a.name > b.name ? 1 : -1))

		return unsortedCategories
	}

	return (
		<div className='AddTransactionForm' data-testid='AddTransactionForm'>
			<div className='Row'>
				<NumberInput
					label='Amount *'
					allowEmpty={false}
					id={FIELD_IDS.amount}
					value={formValues[FIELD_IDS.amount]}
					invalidText='Please provide a valid amount'
					onChange={handleSetFormValues(FIELD_IDS.amount)}
				/>
			</div>
			<div className='flex space-between split no-flex'>
				<Select
					light
					id='category' //TODO: fix this id as well
					labelText='Category *'
					placeholder='Filter...'
					className='CategoryDropdown'
					value={formValues[FIELD_IDS.categoryId]}
					onChange={handleSetFormValues(FIELD_IDS.categoryId)}>
					<SelectItem
						disabled
						hidden
						value=''
						text='Select a Category...'
					/>
					{sortedCategories().map((category, index) => (
						<SelectItem
							value={category.id}
							text={category.name}
							key={`Select-option-${index}`}
						/>
					))}
				</Select>

				<DatePicker
					datePickerType='single'
					value={formValues[FIELD_IDS.date]}
					onChange={handleSetFormValues(FIELD_IDS.date)}>
					<DatePickerInput
						required
						id='paidOn' //TODO: fix this id
						labelText='Date *'
						placeholder='MM/DD/YYYY'
						onChange={handleSetFormValues(FIELD_IDS.date)}
						autoComplete={'off'}
					/>
				</DatePicker>
			</div>
			<div className='Row'>
				<TextInput
					labelText='Description'
					id={FIELD_IDS.description}
					value={formValues[FIELD_IDS.description]}
					onChange={handleSetFormValues(FIELD_IDS.description)}
				/>
			</div>
		</div>
	)
}

TransactionFormFields.propTypes = {
	formValues: PropTypes.object,
	setFormValues: PropTypes.func,
	categories: PropTypes.arrayOf(CategoryProps)
}

const mapStateToProps = state => {
	return {
		categories: state.app.categories
	}
}

export default connect(mapStateToProps)(TransactionFormFields)
