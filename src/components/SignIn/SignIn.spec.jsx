import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { LocalStorageMock } from '@react-mock/localstorage'

import SignIn from './SignIn'
import { TestProvider } from 'utils/test/utils'

const setup = (providerState = {}, hasRequestedAccess) => {
	return render(
		<LocalStorageMock items={{ hasRequestedAccess }}>
			<TestProvider state={providerState}>
				<SignIn />
			</TestProvider>
		</LocalStorageMock>
	)
}

describe('<SignIn />', () => {
	it('renders the signin form properly', () => {
		const {
			getByText,
			getAllByRole,
			getAllByText,
			getByLabelText
		} = setup()
		expect(getAllByRole('button', { text: 'Clear' })).toBeTruthy()
		expect(getAllByText('Sign In')).toHaveLength(2)
		expect(getByLabelText('Email')).toBeTruthy()
		expect(getByLabelText('Password')).toBeTruthy()
		expect(getByText('Request Access')).toBeTruthy()
		expect(getByText('Forgot Password?')).toBeTruthy()
	})
	it('hides request access if previously requested', () => {
		const { queryByText } = setup({}, true)

		expect(queryByText('Request Access')).toBeFalsy()
	})

	it('can fill out and clear the form', () => {
		const { getByLabelText, getByText } = setup()

		const emailInput = getByLabelText('Email')
		const passwordInput = getByLabelText('Password')
		const expected = {
			email: 'test@gmail.com',
			password: 'password'
		}

		fireEvent.change(emailInput, { target: { value: expected.email } })
		fireEvent.change(passwordInput, {
			target: { value: expected.password }
		})

		expect(emailInput.value).toBe(expected.email)
		expect(passwordInput.value).toBe(expected.password)

		fireEvent.click(getByText('Clear'))

		expect(emailInput.value).toBe('')
		expect(passwordInput.value).toBe('')
	})
})
