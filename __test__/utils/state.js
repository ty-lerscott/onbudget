import merge from 'deepmerge'

const getInitialState = (initialState = {}) =>
  merge(
    {
      firebase: {
        auth: {
          isLoaded: false
        }
      },
      app: {
        categories: [],
        isLoading: false,
        transactions: [],
        isFetching: false,
        hasFetchedTransactionsOnce: true
      },
      ui: {
        date: new Date()
      }
    },
    initialState
  )

export default getInitialState
