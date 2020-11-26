import { TRANSACTION } from 'state/AppReducer'

export const setDeleteTransaction = id => dispatch => {
  dispatch({
    type: `SET_DELETE_${TRANSACTION}`,
    payload: id
  })
}

export const setEditTransaction = values => dispatch => {
  dispatch({
    type: `SET_EDIT_${TRANSACTION}`,
    payload: values
  })
}

//TODO: make this one action with the edit one also
export const ussetDeleteTransaction = () => dispatch => {
  dispatch({
    type: `UNSET_DELETE_${TRANSACTION}`
  })
}

export const ussetEditTransaction = () => dispatch => {
  dispatch({
    type: `UNSET_EDIT_${TRANSACTION}`
  })
}
