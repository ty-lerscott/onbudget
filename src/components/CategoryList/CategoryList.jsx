import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'

import Card from 'components/Card/Card'
import Modal from 'components/Modal/Modal'
import { enqueueNotification } from 'components/NotificationCenter/NotificationActions'
import {
	Fields,
	useFormReducer,
	getInitialState
} from 'components/Forms/Category'

import Category from './Category'
import CategoryFilter from './CategoryFilter'
import CategorySkeleton from './CategorySkeleton'
import AddCategoryForm from './AddCategoryForm/AddCategoryForm'

import { editCategoryAction } from './CategoryListActions'

import FILTERS from './utils/filters'
import splitIntoCategories from './utils/splitIntoCategories'

import {
	getBillCategories,
	getDepositCategories,
	getUnplannedCategories
} from 'state/selectors/CategorySelectors'

import { CategoryProps, TransactionProps } from 'definitions'

import './CategoryList.scss'

const CategoryList = ({
	bills,
	notify,
	deposits,
	isLoading,
	unplanned,
	classNames,
	categories,
	editCategory
}) => {
	const [filter, setFilter] = useState(FILTERS.ALL)
	const [combinedCategories, setCombinedCategories] = useState([])
	const [
		{
			values,
			state: { isModalOpen, isFormDirty, isSubmitting, areFieldsMounted }
		},
		{
			setFormValues,
			setIsFormDirty,
			setIsModalOpen,
			setIsSubmitting,
			setAreFieldsMounted
		}
	] = useFormReducer()

	useEffect(() => {
		setCombinedCategories(
			splitIntoCategories(
				filter === FILTERS.ALL
					? {
							categories,
							transactions: (bills || [])
								.concat(deposits || [])
								.concat(unplanned || [])
					  }
					: filter === FILTERS.BILLS
					? {
							categories: getBillCategories({
								app: { categories }
							}),
							transactions: bills
					  }
					: filter === FILTERS.DEPOSITS
					? {
							categories: getDepositCategories({
								app: { categories }
							}),
							transactions: deposits
					  }
					: {
							categories: getUnplannedCategories({
								app: { categories }
							}),
							transactions: unplanned
					  }
			)
		)
	}, [filter, unplanned, deposits, categories, bills])

	const handleCloseModal = () => {
		setIsModalOpen(false)

		return
	}

	const handleSubmitForm = () => {
		setIsSubmitting(true)

		editCategory(values)
			.then(resp => {
				if (!resp?.errors) {
					handleCloseModal()
					notify({
						type: 'success',
						subtitle: `You have successfully updated a the ${values.name} category.`
					})
				}
			})
			.finally(() => {
				setIsSubmitting(false)
				setAreFieldsMounted(false)
			})
	}

	const handleClearForm = () => {
		setFormValues(getInitialState().values)
	}

	const handleEditCategory = ({ total, quantity, ...category }) => () => {
		setAreFieldsMounted(true)
		setFormValues(category)
		setIsFormDirty(false)
		setIsModalOpen(true)
	}

	const handleUnmountFields = () => {
		setAreFieldsMounted(false)
	}

	return (
		<Card
			wrapped
			gridContent
			flexContent={false}
			title='Category List'
			className={cn('CategoryList', classNames)}
			optionalContent={<CategoryFilter setFilter={setFilter} />}>
			<Modal
				isOpen={isModalOpen}
				title='Edit Category'
				isSubmitting={isSubmitting}
				handleCloseModal={handleCloseModal}
				handlePrimaryClick={handleSubmitForm}
				handleSecondaryClick={handleClearForm}
				isDisabled={!isFormDirty || isSubmitting}
				handleCloseModalComplete={handleUnmountFields}>
				{areFieldsMounted && (
					<div className='CategoryFormFields'>
						<Fields
							formValues={values}
							setFormValues={setFormValues}
						/>
					</div>
				)}
			</Modal>
			<ul className='Categories'>
				{isLoading
					? Array(6)
							.fill(CategorySkeleton)
							.map((Component, index) => (
								<Component key={`CategorySkeleton-${index}`} />
							))
					: combinedCategories.map((category, id) => (
							<Category
								{...category}
								key={`Category-${id}`}
								handleOnClick={handleEditCategory(category)}
							/>
					  ))}
			</ul>
			<AddCategoryForm />
		</Card>
	)
}

CategoryList.propTypes = {
	notify: PropTypes.func,
	isLoading: PropTypes.bool,
	classNames: PropTypes.string,
	editCategory: PropTypes.func,
	bills: PropTypes.arrayOf(TransactionProps),
	categories: PropTypes.arrayOf(CategoryProps),
	deposits: PropTypes.arrayOf(TransactionProps),
	unplanned: PropTypes.arrayOf(TransactionProps)
}

const mapStateToProps = state => ({
	categories: state.app.categories,
	isLoading: state.ui.dashboard.isLoading.categoryList
})

const mapDispatchToProps = {
	notify: enqueueNotification,
	editCategory: editCategoryAction
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
