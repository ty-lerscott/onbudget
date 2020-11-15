import React from 'react'
import { render } from '@testing-library/react'

import StackedCategoryChart from './StackedCategoryChart'
import { TestProvider } from 'utils/test/utils'

const providerState = isLoading => ({
	state: {
		ui: {
			date: new Date(),
			dashboard: {
				isLoading: {
					categoryBreakdown: isLoading
				}
			}
		},
		app: {
			isLoading: false,
			categories: [
				{
					id: '0kAP0nySh4NPHN2ewqix',
					color: '#f7f794',
					isDeposit: false,
					isBill: false,
					name: 'Video Games'
				},
				{
					id: '5GZdIZsiol2bdDjsWTmh',
					color: '#cccccc',
					isDeposit: true,
					isBill: false,
					name: 'Income'
				},
				{
					id: '5fUWzZ6YtVZCo535ehIt',
					color: '#c694f7',
					isDeposit: false,
					isBill: false,
					name: 'Groceries'
				},
				{
					id: '6TVJk6uVLFopkNRH4YGe',
					color: '#94c6f7',
					isDeposit: false,
					isBill: false,
					name: 'Entertainment'
				},
				{
					id: '6aXcWBCYdNTOFkE1dfgJ',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Phone'
				},
				{
					id: '7b1CrvvkJDoUkb7yWWUK',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Credit Card'
				},
				{
					id: 'A8mjVtxpAlVtuimS9G1s',
					color: '#94f7f7',
					isDeposit: false,
					isBill: false,
					name: 'Taxes'
				},
				{
					id: 'ACiHVM7AToAMNYY89vw0',
					color: '#f794c6',
					isDeposit: false,
					isBill: false,
					name: 'Health'
				},
				{
					id: 'AaQfs8ciExFGDouBGoY6',
					color: '#94f7c6',
					isDeposit: false,
					isBill: false,
					name: 'Dog'
				},
				{
					id: 'EPwqQf91vEOWwKEXpazp',
					color: '#949459',
					isDeposit: false,
					isBill: false,
					name: 'Personal'
				},
				{
					id: 'Elmabwcip5te9zbY5UAt',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Peleton'
				},
				{
					id: 'MGNQCwH6L2e9Kpp3dsnC',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Gym'
				},
				{
					id: 'NJ5rlhDybuqBpMnuF6G2',
					color: '#947759',
					isDeposit: false,
					isBill: false,
					name: 'Medical'
				},
				{
					id: 'NmYIdRaQNRPPXqyVzbsb',
					color: '#945a59',
					isDeposit: false,
					isBill: false,
					name: 'Savings'
				},
				{
					id: 'PIDJAL6cpUaarLh0MK07',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Student Loans'
				},
				{
					id: 'Q28g4JZExiZGSSlKDgGq',
					color: '#f794f7',
					isDeposit: false,
					isBill: false,
					name: 'Takeout'
				},
				{
					id: 'QE22KcJlZeJaPxJ0UXMS',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Adobe'
				},
				{
					id: 'QehvWHfsPOZlW9ZaIFbg',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Subscriptions'
				},
				{
					id: 'S4i7nnvcyUzka4iHsLKM',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'iCloud'
				},
				{
					id: 'SiCfpq7A1ZBiP9h1WCTn',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Spotify'
				},
				{
					id: 'URCYJvqLDdAZCT4UIzyi',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'SlingTV'
				},
				{
					id: 'WFPXPdS2Ujdx8mXUBmrQ',
					isDeposit: false,
					isBill: false,
					name: 'Other',
					color: '#cccccc'
				},
				{
					id: 'ZKhOeP2hmNsPIf78M05v',
					color: '#94f794',
					isDeposit: false,
					isBill: false,
					name: 'Travel'
				},
				{
					id: 'ZfcZKSoWl4Fv2pOgWNqo',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Rent'
				},
				{
					id: 'alqnfrubd76fQSicfT2c',
					color: '#9494f7',
					isDeposit: false,
					isBill: false,
					name: 'Target'
				},
				{
					id: 'eupApwHVY1SyZ0CqRGMs',
					color: '#c6f794',
					isDeposit: false,
					isBill: false,
					name: 'Clothing'
				},
				{
					id: 'fxd1hMtvEBHl64Qa9NBB',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Audible'
				},
				{
					id: 'gsgRPUjtuKkzbGi17kYB',
					color: '#f79694',
					isDeposit: false,
					isBill: false,
					name: 'Amazon'
				},
				{
					id: 'guqCjLu8nfh9HiInkxPL',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'OnlyFans'
				},
				{
					id: 'pFtoZhXCo2fGDmLgxWep',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Insurance'
				},
				{
					id: 'txP4QUcpQnV8Qd0FqdTp',
					color: '#cccccc',
					isDeposit: false,
					isBill: true,
					name: 'Electricity'
				},
				{
					id: 'yFbfa4bx6AuOBjUA5dno',
					color: '#f7b494',
					isDeposit: false,
					isBill: false,
					name: 'Car'
				}
			],
			isFetching: false,
			transactions: [
				{
					id: '7m3oL1Zby1u1PkcNLL0g',
					date: 1575266400000,
					amount: 10.89,
					description:
						'POS Debit - Visa Check Card 4244 - SPOTIFY USA 877-7781161 NY',
					category: 'Spotify',
					categoryId: 'SiCfpq7A1ZBiP9h1WCTn'
				},
				{
					id: '9QynVu5TWjr6HFPOIfs9',
					date: 1575266400000,
					amount: 56,
					description:
						'POS Debit - Visa Check Card 4244 - FORAGE PUBLIC HOUS LAKEWOOD O',
					category: 'Other',
					categoryId: 'WFPXPdS2Ujdx8mXUBmrQ'
				},
				{
					id: 'C9ZCTZioc0d8NjLkVUGa',
					date: 1575266400000,
					amount: 20,
					description:
						'ACH Transaction - PAYPAL INST XFER 0009100001',
					category: 'Other',
					categoryId: 'WFPXPdS2Ujdx8mXUBmrQ'
				},
				{
					id: 'J895onYkNIUTzpfaoc4U',
					date: 1575266400000,
					amount: 500,
					description:
						'ACH Transaction - BK OF AMER VI MC ONLINE PMT 0012114128',
					category: 'Credit Card',
					categoryId: '7b1CrvvkJDoUkb7yWWUK'
				},
				{
					id: 'K6oKG3L8ktbwXDJ33DPB',
					date: 1575266400000,
					amount: 10.48,
					description:
						'ACH Transaction - FREELANCER INTER IAT PAYPAL 0009100001',
					category: 'Other',
					categoryId: 'WFPXPdS2Ujdx8mXUBmrQ'
				},
				{
					id: 'OHvl3Dn3NQPJZjsRkyNJ',
					date: 1575266400000,
					amount: 14.95,
					description:
						'POS Debit - Visa Check Card 4244 - AUDIBLE USIY3LL44 888-283-50',
					category: 'Audible',
					categoryId: 'fxd1hMtvEBHl64Qa9NBB'
				},
				{
					id: 'QDyAb8wPzZdDKPnK2F70',
					date: 1575266400000,
					amount: 10.48,
					description:
						'ACH Transaction - FREELANCER INTER IAT PAYPAL 0009100001',
					category: 'Other',
					categoryId: 'WFPXPdS2Ujdx8mXUBmrQ'
				},
				{
					id: 'RoewB5z8J9NYtVexEphB',
					date: 1575266400000,
					amount: 56,
					description:
						'POS Debit - Visa Check Card 4244 - FORAGE PUBLIC HOUS LAKEWOOD O',
					category: 'Other',
					categoryId: 'WFPXPdS2Ujdx8mXUBmrQ'
				},
				{
					id: 'TqbQEvh81m5PzuykGy4E',
					date: 1575266400000,
					amount: 34.54,
					description:
						'POS Debit - Visa Check Card 4244 - MCNAMARAS PUBLIC H CLEVELAND',
					category: 'Entertainment',
					categoryId: '6TVJk6uVLFopkNRH4YGe'
				},
				{
					id: 'UNWDKRSPZLQzuTkvcRTy',
					date: 1575266400000,
					amount: 14.95,
					description:
						'POS Debit - Visa Check Card 4244 - AUDIBLE USIY3LL44 888-283-50',
					category: 'Audible',
					categoryId: 'fxd1hMtvEBHl64Qa9NBB'
				},
				{
					id: 'XvHzz2vtEMjbIeS0nCXH',
					date: 1575266400000,
					amount: 10.89,
					description:
						'POS Debit - Visa Check Card 4244 - SPOTIFY USA 877-7781161 NY',
					category: 'Spotify',
					categoryId: 'SiCfpq7A1ZBiP9h1WCTn'
				},
				{
					id: 'i9ykXWkthWMlJM2bTrAw',
					date: 1575266400000,
					amount: 34.54,
					description:
						'POS Debit - Visa Check Card 4244 - MCNAMARAS PUBLIC H CLEVELAND',
					category: 'Entertainment',
					categoryId: '6TVJk6uVLFopkNRH4YGe'
				},
				{
					id: 'j9nAc7omSq5xC8J5fqk1',
					date: 1575266400000,
					amount: 500,
					description:
						'ACH Transaction - BK OF AMER VI MC ONLINE PMT 0012114128',
					category: 'Credit Card',
					categoryId: '7b1CrvvkJDoUkb7yWWUK'
				},
				{
					id: 'lLHUPYEG3TFZDtTqki7G',
					date: 1575266400000,
					amount: 4.07,
					description:
						'POS Debit - Visa Check Card 4244 - MARIANOS 3030 N BROAD CHICAGO',
					category: 'Groceries',
					categoryId: '5fUWzZ6YtVZCo535ehIt'
				},
				{
					id: 'u27KEXT33bUnrQpP2V9E',
					date: 1575266400000,
					amount: 20,
					description:
						'ACH Transaction - PAYPAL INST XFER 0009100001',
					category: 'Other',
					categoryId: 'WFPXPdS2Ujdx8mXUBmrQ'
				},
				{
					id: 'vUy7LBV2Wc4UB3mrYr4Y',
					date: 1575266400000,
					amount: 4.07,
					description:
						'POS Debit - Visa Check Card 4244 - MARIANOS 3030 N BROAD CHICAGO',
					category: 'Groceries',
					categoryId: '5fUWzZ6YtVZCo535ehIt'
				},
				{
					id: 'yFWIJ49BrNJ4XxsENKMn',
					date: 1575266400000,
					amount: 10.61,
					description:
						'POS Debit - Visa Check Card 4244 - ADOBE PHOTOGPHY PL 800-833-66',
					category: 'Adobe',
					categoryId: 'QE22KcJlZeJaPxJ0UXMS'
				},
				{
					id: 'zBCCco0pStBqb5ja1lbJ',
					date: 1575266400000,
					amount: 10.61,
					description:
						'POS Debit - Visa Check Card 4244 - ADOBE PHOTOGPHY PL 800-833-66',
					category: 'Adobe',
					categoryId: 'QE22KcJlZeJaPxJ0UXMS'
				},
				{
					id: '0v618dA4Ou2ArQE0Mp5z',
					date: 1575352800000,
					amount: 90,
					description:
						'ACH Transaction - EDUCATIONAL COMP ACH LNPYMT 0004300012',
					category: 'Student Loans',
					categoryId: 'PIDJAL6cpUaarLh0MK07'
				},
				{
					id: '2ISXLnVFOpMxcCKNlhlo',
					date: 1575352800000,
					amount: 13.99,
					description:
						'POS Debit - Visa Check Card 4244 - AMZN MKTP USU048E AMZNCOM B',
					category: 'Amazon',
					categoryId: 'gsgRPUjtuKkzbGi17kYB'
				}
			],
			hasFetchedTransactionsOnce: true
		}
	}
})

const setup = isLoading =>
	render(
		<TestProvider {...providerState(isLoading)}>
			<StackedCategoryChart />
		</TestProvider>
	)

describe('<StackedCategoryChart />', () => {
	it('renders in a loading state if app is loading', () => {
		const { getByTestId } = setup(true)

		expect(getByTestId('CategoryBreakdown-Loading')).toBeTruthy()
	})

	it('properly renders the stacked graph canvas', () => {
		const { getByTestId, debug } = setup()

		expect(getByTestId('CategoryBreakdown-canvas')).toBeTruthy()
	})
})
