import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import OverviewChart from './OverviewChart'
import { TestProvider } from 'utils/test/utils'

import categories from '__test-data__/categories'
import { unplanned } from '__test-data__/transactions'

const setup = ({ providerState, componentProps } = {}) => {
	return render(
		<TestProvider state={providerState}>
			<OverviewChart {...componentProps} />
		</TestProvider>
	)
}

describe('<OverviewChart />', () => {
	it('renders a loading state if app is loading', () => {
		const { getByText, getByLabelText } = setup({
			componentProps: {
				unplanned: []
			},
			providerState: {
				app: {
					categories
				}
			}
		})

		expect(getByText('Overview')).toBeTruthy()
		expect(getByLabelText('Active loading indicator')).toBeTruthy()
	})

	it('renders a donut chart when app is not loading', () => {
		const { debug, getByTestId } = setup({
			componentProps: {
				unplanned
			},
			providerState: {
				app: {
					categories
				},
				ui: {
					dashboard: {
						isLoading: {
							overview: false
						}
					}
				}
			}
		})
		expect(getByTestId('OverviewChart-canvas')).toBeTruthy()
	})
})
