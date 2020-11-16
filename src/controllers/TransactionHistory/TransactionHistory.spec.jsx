import React from 'react'
import { render } from '@testing-library/react'

import TransActionHistory from './TransactionHistory'
import { TestProvider } from 'utils/test/utils'

import state from './__test__/state'

const setup = stateProps =>
	render(
		<TestProvider {...stateProps}>
			<TransActionHistory />
		</TestProvider>
	)

describe('<TransactionHistory />', () => {
	it('renders the table skeleton if there no transactions passed', () => {
		const { getByTestId } = setup(state())

		expect(getByTestId('TransactionHistoryTable-loading')).toBeTruthy()
	})
	it('renders the table empty when given transactions', () => {
		const { getByTestId, getByText } = setup(
			state({ hasFetchedTransactionsOnce: true, transactions: [] })
		)

		expect(getByTestId('TransactionHistoryTable')).toBeTruthy()
		expect(
			getByText("There's no transaction data for this month")
		).toBeTruthy()
	})
	it('renders the table when given transactions', () => {
		const { getByText, debug } = setup(
			state({ hasFetchedTransactionsOnce: true })
		)

		expect(getByText('Date')).toBeTruthy()
		expect(getByText('Category')).toBeTruthy()
		expect(getByText('Description')).toBeTruthy()
		expect(getByText('Amount')).toBeTruthy()
		expect(
			getByText(
				'POS Debit - Visa Check Card 4244 - SPOTIFY USA 877-7781161 NY'
			)
		).toBeTruthy()
	})
})
