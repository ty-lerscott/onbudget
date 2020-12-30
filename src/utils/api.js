const isEmulating = !!process.env.REACT_APP_EMULATING

const api = async options => {
  const { body = {}, path, dispatch, getFirebase } = options
  const firebase = await getFirebase()

  if (isEmulating) {
    firebase.functions().emulatorOrigin = 'http://localhost:3030'
  }

  dispatch({
    type: 'API_PENDING',
    payload: { path }
  })

  const func = firebase.functions().httpsCallable(path)

  const isBodyObject = Array.isArray(body) ? false : Object.keys(body)?.length

  return func({ isEmulating, ...(isBodyObject ? body : { body }) })
    .then(({ data, errors, result }) => {
      if (Array.isArray(errors) && errors?.length) {
        dispatch({
          type: 'API_FAILURE',
          payload: { path }
        })
        throw new Error(errors[0].message)
      }

      const payload = {
        [path]: data || result
      }

      dispatch({
        type: 'API_SUCCESS',
        payload: {
          path
        }
      })

      return payload
    })
    .catch(resp => {
      dispatch({
        type: 'API_FAILURE',
        payload: { path }
      })
      console.error(resp)
      // throw new Error("SOME ERROR");
    })
}

export default api
