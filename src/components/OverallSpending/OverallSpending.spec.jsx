import React from 'react'
import { render } from '@testing-library/react'

import OverallSpending from './OverallSpending'
import { TestProvider } from 'utils/test/utils'

const providerState = isLoading => ({
	state: {
		ui: {
			dashboard: {
				isLoading: {
					overallSpending: isLoading
				}
			}
		}
	}
})

const setup = ({ componentProps, providerProps }) => {
	const allProps = {
		dispatch: jest.fn(),
		transactions: [],
		...componentProps
	}

	return {
		transactions: allProps.transactions,
		selectors: render(
			<TestProvider {...providerProps}>
				<OverallSpending {...allProps} />
			</TestProvider>
		)
	}
}

describe('<OverallSpending />', () => {
	it('renders the skeleton text if app is loading', () => {
		const {
			selectors: { getByTestId }
		} = setup({
			providerProps: providerState(true)
		})

		expect(getByTestId('OverallSpendingSkeleton')).toBeTruthy()
	})

	it('renders the sum total spending given an array of transactions', () => {
		const {
			selectors: { getByText }
		} = setup({
			providerProps: providerState(false),
			componentProps: {
				transactions: [
					{
						id: '1',
						amount: 10,
						date: 123,
						categoryId: '1',
						description: ''
					},
					{
						id: '2',
						amount: 20,
						date: 123,
						categoryId: '1',
						description: ''
					},
					{
						id: '3',
						amount: 30,
						date: 123,
						categoryId: '1',
						description: ''
					}
				]
			}
		})

		expect(getByText('$60.00')).toBeTruthy()
	})
})
