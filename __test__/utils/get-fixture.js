export const NAMES = {
  categories: 'categories',
  transactions: 'transactions',
  transactionsByMonth: 'transactionsByMonth'
}

const fixtureRoot = '__test__/fixtures'

const FIXTURES = {
  [NAMES.categories]: require(`${fixtureRoot}/categories.json`),
  [NAMES.transactions]: require(`${fixtureRoot}/transactions.json`),
  [NAMES.transactionsByMonth]: require(`${fixtureRoot}/transactionsByMonth.json`)
}

export const getFixture = name => FIXTURES[name]
