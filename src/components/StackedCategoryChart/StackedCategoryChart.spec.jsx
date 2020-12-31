import React from 'react'
import { screen } from '@tsw38/otis'

import {
  getState,
  getFixture,
  FIXTURE_NAMES,
  renderWithStore
} from '__test__/utils'

import StackedCategoryChart from './StackedCategoryChart'

const setup = store =>
  renderWithStore(<StackedCategoryChart />, {
    store: getState({
      app: {
        categories: getFixture(FIXTURE_NAMES.categories).result,
        transactions: getFixture(FIXTURE_NAMES.transactions).result
      },
      ...store
    })
  })

describe('<StackedCategoryChart />', () => {
  it('renders in a loading state if app is loading', () => {
    setup({
      ui: {
        dashboard: {
          isLoading: {
            categoryBreakdown: true
          }
        }
      }
    })

    expect(screen.getByTestId('CategoryBreakdown-Loading')).toBeInTheDocument()
  })

  it('properly renders the stacked graph canvas', () => {
    setup({
      ui: {
        dashboard: {
          isLoading: {
            categoryBreakdown: false
          }
        }
      }
    })

    expect(screen.getByTestId('CategoryBreakdown-canvas')).toBeInTheDocument()
  })
})
