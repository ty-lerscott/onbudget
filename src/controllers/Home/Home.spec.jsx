import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import ForgotPassword from './Home'
import { TestProvider } from 'utils/test/utils'

import state from './__test__/state'

const setup = ({ appState, componentProps } = {}) =>
	render(
		<TestProvider {...appState}>
			<ForgotPassword {...componentProps} />
		</TestProvider>
	)

describe('<Home>', () => {
	it('doesnt render if firebase has not loaded', () => {
		const { queryByTestId } = setup()

		expect(queryByTestId('Page-Home')).toBeFalsy()
	})

	it('shows sign in form if not logged in', () => {
		const { getAllByText } = setup({
			appState: state({ hasFirebaseLoaded: true })
		})

		expect(getAllByText('Sign In')).toHaveLength(2)
	})

	it('shows dashboard when user is logged in', () => {
		const { getByTestId, getAllByTestId } = setup({
			appState: state({ hasFirebaseLoaded: true, isSignedIn: true })
		})

		expect(getByTestId('Page-Home')).toBeTruthy()
		expect(getByTestId('OverallSpending')).toBeTruthy()
		expect(getAllByTestId('Card-ContentWrapper')).toHaveLength(3)
		expect(getAllByTestId('Card')).toHaveLength(3)
		expect(getByTestId('MonthDisplay')).toBeTruthy()
		expect(getByTestId('ImportStatementForm')).toBeTruthy()
		expect(getByTestId('OpenModal-ImportTransactions')).toBeTruthy()
		expect(getByTestId('OpenModal-AddTransaction')).toBeTruthy()
	})
})

// hasFirebaseLoaded = false,
// 	isFirebaseInitializing = false
