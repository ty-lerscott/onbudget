import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { useEffect } from 'react'

import View from 'views/transaction-history'

import { fetchCategories } from 'actions/CategoryActions'
import { fetchTransactionsByMonth } from 'actions/TransactionActions'
import { getAllMonthTransactions } from 'state/selectors/TransactionSelectors'

import { isAuthenticated } from 'state/selectors/UserSelectors'

import { TransactionProps } from 'definitions'

const TransactionHistory = ({
	thisMonth,
	isSignedIn,
	transactions,
	getCategories,
	fetchTransactions,
	categoriesHaveLength,
	hasFetchedTransactionsOnce
}) => {
	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		if (isSignedIn) {
			if (!categoriesHaveLength) {
				getCategories()
			}

			if (!transactions.length) {
				fetchTransactions(thisMonth)
			}
		}
	}, [isSignedIn, thisMonth])
	/* eslint-enable react-hooks/exhaustive-deps */

	const handleFindTransaction = id =>
		transactions.find(transaction => transaction.id === id)

	const handleEditTransaction = ({ id }) => () => {
		console.log('edit', handleFindTransaction(id))
	}

	const handleDeleteTransaction = ({ id }) => () => {
		console.log('delete', handleFindTransaction(id))
	}

	return (
		<View
			onEditTransaction={handleEditTransaction}
			onDeleteTransaction={handleDeleteTransaction}
			{...(hasFetchedTransactionsOnce ? { transactions } : {})}></View>
	)
}

TransactionHistory.propTypes = {
	isSignedIn: PropTypes.bool,
	getCategories: PropTypes.func,
	fetchTransactions: PropTypes.func,
	categoriesHaveLength: PropTypes.bool,
	thisMonth: PropTypes.instanceOf(Date),
	hasFetchedTransactionsOnce: PropTypes.bool,
	transactions: PropTypes.arrayOf(TransactionProps)
}

const mapDispatchToProps = {
	getCategories: fetchCategories,
	fetchTransactions: fetchTransactionsByMonth
}

const mapStateToProps = state => ({
	thisMonth: state.ui.date,
	isSignedIn: isAuthenticated(state),
	transactions: getAllMonthTransactions(state),
	categoriesHaveLength: !!state.app.categories.length,
	hasFetchedTransactionsOnce: state.app.hasFetchedTransactionsOnce
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)
