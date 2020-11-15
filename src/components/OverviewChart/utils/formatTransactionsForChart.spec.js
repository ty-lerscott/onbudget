import formatter from './formatTransactionsForChart'

import categories from '__test-data__/categories'
import { unplanned } from '__test-data__/transactions'

describe('formatTransactionsForChart', () => {
	it('returns empty array if not given anything', () => {
		expect(formatter()).toHaveLength(0)
	})
	it('returns empty array if not given transactions', () => {
		expect(formatter(null, [])).toHaveLength(0)
	})
	it('returns empty array if not given categories', () => {
		expect(formatter([])).toHaveLength(0)
	})

	it('returns a dataset for the graph', () => {
		const expectedLabels = [
			'Target',
			'Amazon',
			'Video Games',
			'Savings',
			'Other'
		]
		const expectedData = [61.54, 35.04, 12.85, 6.04, 5.22]
		const expectedColor = [
			'#9494f7',
			'#f79694',
			'#f7f794',
			'#945a59',
			'#cccccc'
		]
		const { labels, datasets } = formatter(unplanned, categories)

		expect(labels).toEqual(expect.arrayContaining(expectedLabels))

		expect(datasets.length).toEqual(1)
		expect(datasets[0].data).toEqual(expect.arrayContaining(expectedData))
		expect(datasets[0].backgroundColor).toEqual(
			expect.arrayContaining(expectedColor)
		)
	})
})
