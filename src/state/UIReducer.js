import { combineReducers } from 'redux'
import { startOfMonth } from 'date-fns'
import { TRANSACTION } from './AppReducer'

export const DATE = 'DATE'
export const LOADING_COMPLETE = 'LOADING_COMPLETE'

export const initialState = {
  date: startOfMonth(new Date()),
  dashboard: {
    isLoading: {
      categoryList: true,
      overallSpending: true,
      categoryBreakdown: true,
      transactionOverview: true,
      averageDailySpending: true
    }
  },
  transactionHistory: {
    id: '',
    isSubmitting: false,
    modal: {
      delete: false,
      edit: {}
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
          edit: {},
          // TODO: remove id from parent scope,
          // TODO: make delete an object like edit
          delete: true
        }
      }
    case `SET_EDIT_${TRANSACTION}`:
      return {
        ...state,
        id: payload.id,
        modal: {
          // TODO: remove id from parent scope,
          // TODO: make delete an object like edit
          delete: false,
          edit: payload
        }
      }
    case `UNSET_MODIFY_${TRANSACTION}_MODAL`:
    case `UNSET_DELETE_${TRANSACTION}`: //TODO: change delete action to use above action
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
