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
      }
    },
    initialState
  )

export default getInitialState
