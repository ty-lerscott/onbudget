import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import ForgotPassword from './ForgotPassword'
import { TestProvider } from 'utils/test/utils'

const providerState = () => ({
	state: {
		router: {
			location: {
				pathname: '/',
				search: '',
				hash: '',
				query: {}
			},
			action: 'POP'
		},
		firebase: {
			requesting: {},
			requested: {},
			timestamps: {},
			data: {},
			ordered: {},
			auth: {
				uid: 'Q2smHTqfpiQMC2nslkIX92dEMOB3',
				displayName: null,
				photoURL: null,
				email: 'tyler.scott.14@gmail.com',
				emailVerified: true,
				phoneNumber: null,
				isAnonymous: false,
				tenantId: null,
				providerData: [
					{
						uid: 'tyler.scott.14@gmail.com',
						displayName: null,
						photoURL: null,
						email: 'tyler.scott.14@gmail.com',
						phoneNumber: null,
						providerId: 'password'
					}
				],
				apiKey: 'AIzaSyBBUtULZb9dSNyz-0FAgKS8k3Tx90uxVRs',
				appName: '[DEFAULT]',
				authDomain: 'on-budget-app.firebaseapp.com',
				stsTokenManager: {
					apiKey: 'AIzaSyBBUtULZb9dSNyz-0FAgKS8k3Tx90uxVRs',
					refreshToken:
						'AG8BCnf7d2L-YhVJ644h32vWOifaxl9ZqSiOcQVTcM-By97gzsrCM42w7YpFFgTgT_kR2CLpMZgHlHqpHzy6aqZNpPIgtqJoBoh1s_zAEdgsnGukuGfwXasj02eQkHtXC6Zgn0sCviYZD37tGzdouBl0yKFOOfIUvl_18nHXkkxiB9v4S2Xfvn8yNnlwwD1OQoftCqySbH6fJ4tg87Q9ud7HSHB7IdYyrA',
					accessToken:
						'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJmOGI1NTdjMWNkMWUxZWM2ODBjZTkyYWFmY2U0NTIxMWUxZTRiNDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vb24tYnVkZ2V0LWFwcCIsImF1ZCI6Im9uLWJ1ZGdldC1hcHAiLCJhdXRoX3RpbWUiOjE2MDQ4NzYxMzksInVzZXJfaWQiOiJRMnNtSFRxZnBpUU1DMm5zbGtJWDkyZEVNT0IzIiwic3ViIjoiUTJzbUhUcWZwaVFNQzJuc2xrSVg5MmRFTU9CMyIsImlhdCI6MTYwNTQ2NTk3OCwiZXhwIjoxNjA1NDY5NTc4LCJlbWFpbCI6InR5bGVyLnNjb3R0LjE0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInR5bGVyLnNjb3R0LjE0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.XgnJQZG3REd9EP6y9AozB-PbR7Wi_0tqBXfF19bV6mVohTqbaKRGbDnPU0nj4U9DYhJVJK-XTRaBR7t6l5v_ZYEhuES38DEW-FBh98ub0ttV_ZHk7ZeJEZ6JxZqM_Yz2B6C6YqT1gj9GKov6L97da_lJ5fAUn551Oee1bh1D_CG3AVDHfL4vXouAbkdehN3xUxcCQtILE7GI_LUsoyT3N-nYNFWNFZWEwsa23HLP_ZykfA3Q6q--zZRuv6PuEX5DUC_UO4XToNUSXO-o0S_b6Pavk7Zi-kbGKxojc0vjXrbg5xzX-hfSMBjcl9Oyw71sniCYp-bhUlIozBD8gJ-CJA',
					expirationTime: 1605469578000
				},
				redirectEventId: null,
				lastLoginAt: '1604876139562',
				createdAt: '1604206275691',
				multiFactor: {
					enrolledFactors: []
				},
				isEmpty: false,
				isLoaded: true
			},
			authError: null,
			profile: {
				isEmpty: true,
				isLoaded: true
			},
			listeners: {
				byId: {},
				allIds: []
			},
			isInitializing: false,
			errors: []
		},
		firestore: {
			status: {
				requesting: {},
				requested: {},
				timestamps: {}
			},
			data: {},
			ordered: {},
			listeners: {
				byId: {},
				allIds: []
			},
			errors: {
				byQuery: {},
				allIds: []
			},
			queries: {}
		},
		ui: {
			date: '2020-11-01T05:00:00.000Z',
			dashboard: {
				isLoading: {
					overview: false,
					categoryList: false,
					overallSpending: false,
					categoryBreakdown: false,
					transactionOverview: false
				}
			}
		},
		app: {
			isLoading: false,
			categories: [],
			isFetching: false,
			transactions: [],
			hasFetchedTransactionsOnce: true
		},
		session: {
			token: '',
			claims: [],
			authTime: '',
			fetched: false,
			issuedAtTime: '',
			expirationTime: '',
			signInProvider: '',
			signInSecondFactor: ''
		},
		notifications: []
	}
})

const setup = ({ isLoading, componentProps } = {}) =>
	render(
		<TestProvider {...providerState(isLoading)}>
			<ForgotPassword {...componentProps} />
		</TestProvider>
	)

describe('<ForgotPassword', () => {
	it('renders the view', () => {
		const { debug, getByText } = setup()

		expect(getByText('Forgot Password')).toBeTruthy()
		expect(
			getByText('Please enter your email address', { exact: false })
		).toBeTruthy()
		expect(getByText('Email')).toBeTruthy()
	})

	it('can edit and clear the email', () => {
		const { getByLabelText, getByText } = setup()

		const emailInput = getByLabelText('Email')

		const expected = {
			email: 'test@gmail.com'
		}

		fireEvent.change(emailInput, { target: { value: expected.email } })

		expect(emailInput.value).toBe(expected.email)

		fireEvent.click(getByText('Clear'))

		expect(emailInput.value).toBe('')
	})
})
