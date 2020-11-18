import { TRANSACTION } from 'state/AppReducer'

export const setDeleteTransaction = id => dispatch => {
  dispatch({
    type: `SET_DELETE_${TRANSACTION}`,
    payload: id
  })
}

export const ussetDeleteTransaction = id => dispatch => {
  dispatch({
    type: `UNSET_DELETE_${TRANSACTION}`
  })
}
