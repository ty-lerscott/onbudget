import { combineReducers } from 'redux'
import { startOfMonth } from 'date-fns'
import { TRANSACTION } from './AppReducer'

export const DATE = 'DATE'
export const LOADING_COMPLETE = 'LOADING_COMPLETE'

const now = new Date()

const initialState = {
  date: startOfMonth(now),
  dashboard: {
    isLoading: {
      overview: true,
      categoryList: true,
      overallSpending: true,
      categoryBreakdown: true,
      transactionOverview: true
    }
  },
  transactionHistory: {
    id: '',
    isSubmitting: false,
    modal: {
      delete: false,
      edit: false
    }
  }
}

export const getInitialState = {
  transactionHistory() {
    return initialState.transactionHistory
  }
}

const date = (state = initialState.date, { type, payload }) => {
  switch (type) {
    case `SET_${DATE}`:
      return payload
    default:
      return state
  }
}

const dashboard = (state = initialState.dashboard, { type, payload }) => {
  switch (type) {
    case `SET_${LOADING_COMPLETE}`:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [payload]: false
        }
      }
    default:
      return state
  }
}

const transactionHistory = (
  state = initialState.transactionHistory,
  { type, payload }
) => {
  switch (type) {
    case `SET_DELETE_${TRANSACTION}`:
      return {
        ...state,
        id: payload,
        modal: {
          ...initialState.transactionHistory.modal,
          delete: true
        }
      }
    case `UNSET_DELETE_${TRANSACTION}`:
      return {
        ...state,
        ...getInitialState.transactionHistory()
      }
    default:
      return state
  }
}

export default combineReducers({
  date,
  dashboard,
  transactionHistory
})
