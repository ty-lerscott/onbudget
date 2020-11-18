import clone from 'clone-deep'
import { combineReducers } from 'redux'

export const STATEMENT = 'STATEMENT'
export const CATEGORIES = 'CATEGORIES'
export const TRANSACTION = 'TRANSACTION'
export const TRANSACTIONS = 'TRANSACTIONS'

const initialState = {
  isLoading: true,
  categories: [],
  isFetching: false,
  transactions: [],
  hasFetchedTransactionsOnce: false
}

const isLoading = (state = initialState.isLoading, { type }) => {
  switch (type) {
    case '@@reactReduxFirebase/LOGIN':
    case '@@reactReduxFirebase/LOGIN_ERROR':
    case '@@reactReduxFirebase/AUTH_EMPTY_CHANGE':
      return false
    case '@@reactReduxFirebase/AUTHENTICATION_INIT_STARTED':
      return true
    default:
      return state
  }
}

const isFetching = (state = initialState.isFetching, { type }) => {
  switch (type) {
    case `${CATEGORIES}_PENDING`:
      return true
    case `${CATEGORIES}_SUCCESS`:
    case `${CATEGORIES}_FAILURE`:
      return false
    default:
      return state
  }
}
const categories = (state = initialState.categories, { type, payload }) => {
  switch (type) {
    case `${CATEGORIES}_SUCCESS`:
      return payload
    case `ADD_${CATEGORIES}_SUCCESS`:
      return state.concat(payload)
    case `EDIT_${CATEGORIES}_SUCCESS`:
      const nextState = clone(state)

      const changedIndex = nextState.findIndex(item => item.id === payload.id)

      nextState[changedIndex] = payload

      return nextState
    case `${CATEGORIES}_PENDING`:
    case `${CATEGORIES}_FAILURE`:
    default:
      return state
  }
}

const transactions = (state = initialState.transactions, { type, payload }) => {
  switch (type) {
    case `${TRANSACTIONS}_SUCCESS`:
      return payload
    case `DELETE_${TRANSACTION}_SUCCESS`:
      return state.filter(transaction => transaction.id !== payload)
    case `${TRANSACTIONS}_BY_MONTH_SUCCESS`:
      return state.concat(payload)
    case `${TRANSACTIONS}_PENDING`:
    case `${TRANSACTIONS}_FAILURE`:
    default:
      return state
  }
}

const hasFetchedTransactionsOnce = (
  state = initialState.hasFetchedTransactionsOnce,
  { type }
) => {
  switch (type) {
    case `${TRANSACTIONS}_BY_MONTH_SUCCESS`:
      return true
    default:
      return state
  }
}

export default combineReducers({
  isLoading,
  categories,
  isFetching,
  transactions,
  hasFetchedTransactionsOnce
})
