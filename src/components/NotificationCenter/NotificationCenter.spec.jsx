import React from 'react'
import { render, waitFor } from '@testing-library/react'

import NotificationCenter from './NotificationCenter'
import { TestProvider } from 'utils/test/utils'

const notifications = [
	{
		id: '1',
		subtitle: 'Notification subtitle',
		type: 'success',
		isRequired: {} //TODO: what is this
	},
	{
		id: '2',
		subtitle: 'Notification subtitle',
		type: 'info',
		isRequired: {} //TODO: what is this
	}
]

const setup = notificationsArr =>
	render(
		<TestProvider
			state={{
				notifications: notificationsArr
			}}>
			<NotificationCenter />
		</TestProvider>
	)

describe('<NotificationCenter />', () => {
	beforeEach(() => {
		jest.useFakeTimers()
	})

	it('renders a list of notifications', async () => {
		const { queryAllByRole } = setup(notifications)

		expect(queryAllByRole('alert')).toHaveLength(2)
		jest.advanceTimersByTime(10000)
		expect(queryAllByRole('alert')).toHaveLength(0)
	})

	// Running all pending timers and switching to real timers using Jest
	afterEach(() => {
		jest.runOnlyPendingTimers()
		jest.useRealTimers()
	})
})
