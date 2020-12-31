import { cleanup } from '@tsw38/otis'
import axios from 'axios'
import { setupServer } from '__test__/utils'

const mockAxios = axios.create({
  baseUrl: 'http://localhost:3000',
  timeout: 1000
})

// not a huge fan of mocking the API to make it make a xhr request, but firebase is weird and this is where we are
jest.mock('utils/api', body => ({ dispatch, getState, getFirebase, path }) =>
  mockAxios
    .post(path, body)
    .then(({ data, errors }) => {
      if (Array.isArray(errors) && errors?.length) {
        dispatch({
          type: 'API_FAILURE',
          payload: { path }
        })
        throw new Error(errors[0].message)
      }

      const payload = {
        [path]: data?.result || data
      }

      dispatch({
        type: 'API_SUCCESS',
        payload
      })

      return payload
    })
    .catch(resp => {
      dispatch({
        type: 'API_FAILURE',
        payload: { path }
      })
    })
)

const server = setupServer()
global.server = server

beforeAll(() => {
  server.beforeAll()
})

afterAll(() => {
  server.afterAll()
})

afterEach(() => {
  server.afterEach()
  cleanup()
})
