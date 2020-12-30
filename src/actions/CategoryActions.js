import { CATEGORIES } from 'state/AppReducer'

export const fetchCategories = () => async (
  dispatch,
  getState,
  { getFirebase, api }
) => {
  dispatch({
    type: `${CATEGORIES}_PENDING`
  })

  return api({
    dispatch,
    getState,
    getFirebase,
    path: 'categories'
  }).then(({ categories } = {}) => {
    dispatch({
      type: `${CATEGORIES}_SUCCESS`,
      payload: categories
    })

    return categories
  })
}
