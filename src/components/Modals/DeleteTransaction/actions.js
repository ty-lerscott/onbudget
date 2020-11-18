import { TRANSACTION } from 'state/AppReducer'

export const closeModalAction = () => dispatch => {
  dispatch({
    type: `UNSET_DELETE_${TRANSACTION}`
  })
}
