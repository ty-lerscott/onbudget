export const NAMES = {
  categories: 'categories',
  addCategory: 'addCategory',
  editCategory: 'editCategory',
  transactions: 'transactions',
  addTransaction: 'addTransaction',
  transactionsByMonth: 'transactionsByMonth'
}

const fixtureRoot = '__test__/fixtures'

const FIXTURES = {
  [NAMES.categories]: require(`${fixtureRoot}/categories.json`),
  [NAMES.addCategory]: require(`${fixtureRoot}/addCategory.json`),
  [NAMES.editCategory]: require(`${fixtureRoot}/editCategory.json`),
  [NAMES.transactions]: require(`${fixtureRoot}/transactions.json`),
  [NAMES.addTransaction]: require(`${fixtureRoot}/addTransaction.json`),
  [NAMES.transactionsByMonth]: require(`${fixtureRoot}/transactionsByMonth.json`)
}

export const getFixture = name => FIXTURES[name]
