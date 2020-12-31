import React from 'react'
import { screen, buildFakeModel, fake, sequence } from '@tsw38/otis'

import { renderWithStore, getState } from '__test__/utils'

import NotificationCenter from './NotificationCenter'

const buildNotification = buildFakeModel('Notification', {
  fields: {
    id: sequence().toString(),
    subtitle: fake(f => f.random.words(5)),
    type: 'success',
    isRequired: {}
  }
})

const setup = store =>
  renderWithStore(<NotificationCenter />, { store: getState(store) })

describe('<NotificationCenter />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('renders a list of notifications', async () => {
    const notifcationLength = 5

    setup({
      notifications: Array(notifcationLength)
        .fill(null)
        .map(e => buildNotification())
    })

    expect(screen.queryAllByRole('alert')).toBeArrayOfSize(notifcationLength)
    jest.advanceTimersByTime(notifcationLength * 5000)
    expect(screen.queryAllByRole('alert')).toBeArrayOfSize(0)
  })

  // Running all pending timers and switching to real timers using Jest
  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })
})
