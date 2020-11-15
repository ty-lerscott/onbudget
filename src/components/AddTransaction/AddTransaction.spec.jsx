import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import AddTransaction from './AddTransaction'
import { TestProvider } from 'utils/test/utils'

const setup = props => {
	const allProps = {
		notify: jest.fn(),
		getTransaction: jest.fn(),
		addTransaction: jest.fn(),
		importStatement: jest.fn(),
		...props
	}

	return render(
		<TestProvider>
			<AddTransaction {...allProps} />
		</TestProvider>
	)
}

describe('<AddTransaction />', () => {
	let selectors

	beforeEach(() => {
		selectors = setup()
	})

	it('renders correctly with the add transaction form type after clicking the right button', async () => {
		const { getByTestId, getByLabelText } = selectors

		fireEvent.click(getByTestId('OpenModal-AddTransaction'))

		expect(getByLabelText('Amount *')).toBeTruthy()
		expect(getByLabelText('Category *')).toBeTruthy()
		expect(getByLabelText('Date *')).toBeTruthy()
		expect(getByLabelText('Description')).toBeTruthy()
	})

	it('renders correctly with the import transactions form type after clicking the right button', async () => {
		const { getByText, getByTestId } = selectors

		fireEvent.click(getByTestId('OpenModal-ImportTransactions'))

		expect(getByText('File')).toBeTruthy()
		expect(getByText('Choose a File')).toBeTruthy()
	})
})
