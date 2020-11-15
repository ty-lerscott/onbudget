import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Notification from './Notification'
import { TestProvider } from 'utils/test/utils'

const setup = () => {
	const props = {
		id: '1',
		subtitle: 'Notification subtitle',
		type: 'success',
		isRequired: {} //TODO: what is this
	}

	return {
		props,
		selectors: render(
			<TestProvider>
				<Notification {...props} />
			</TestProvider>
		)
	}
}

describe('<Notification />', () => {
	it('renders as expected', () => {
		const {
			props,
			selectors: { getByText, getByRole }
		} = setup()
		expect(getByText(props.subtitle)).toBeTruthy()
		expect(
			getByRole('heading', { text: props.type, exact: false })
		).toBeTruthy()
	})

	it('closes the notification when clicking close icon', () => {
		const {
			props,
			selectors: { queryByRole, getByRole }
		} = setup()

		fireEvent.click(getByRole('button'))

		expect(queryByRole('alert')).toBeFalsy()
	})
})
