import toCurrency from './currency'

describe('utils/currency', () => {
	describe('toCurrency', () => {
		it('returns 0 if not a number', () => {
			expect(toCurrency('a')).toEqual(0)
			expect(toCurrency({})).toEqual(0)
			expect(toCurrency([])).toEqual(0)
		})

		it('converts a number to USD', () => {
			expect(toCurrency(10)).toEqual('$10.00')
			expect(toCurrency(11.222)).toEqual('$11.22')
			expect(toCurrency(-1)).toEqual('-$1.00')
		})
	})
})
