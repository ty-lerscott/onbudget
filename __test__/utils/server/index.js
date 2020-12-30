import { setupServer as mswSetup } from '@tsw38/otis'

import handlers from './handlers'

const setupServer = () => {
  const { listen, close, resetHandlers } = mswSetup(...handlers)

  return {
    afterAll: () => close(),
    afterEach: () => resetHandlers(),
    beforeAll: () => listen({ onUnhandledRequest: 'error' })
  }
}

export default setupServer
