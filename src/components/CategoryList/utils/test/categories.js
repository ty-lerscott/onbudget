const categories = [
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
]

export default categories
