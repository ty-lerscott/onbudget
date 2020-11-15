import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TransactionOverview from './TransactionOverview'
import { TestProvider } from 'utils/test/utils'

const providerState = isLoading => ({
	state: {
		ui: {
			date: new Date(),
			dashboard: {
				isLoading: {
					transactionOverview: isLoading
				}
			}
		}
	}
})

const setup = ({ isLoading, componentProps } = {}) =>
	render(
		<TestProvider {...providerState(isLoading)}>
			<TransactionOverview {...componentProps} />
		</TestProvider>
	)

describe('<TransactionOverview', () => {
	it('renders in a loading state when app is loading', () => {
		const { queryByText } = setup({ isLoading: true })

		expect(queryByText('$')).toBeFalsy()
	})
	it('renders all overviews', () => {
		const { getAllByText } = setup()

		expect(getAllByText('$0.00', { exact: false })).toHaveLength(3)
	})
})
