import React from 'react'
import { screen, userEvent, waitFor } from '@tsw38/otis'

import {
  getState,
  getFixture,
  FIXTURE_NAMES,
  renderWithStore
} from '__test__/utils'

import CategoryList from './CategoryList'

import { bills, deposits, unplanned } from './utils/test/CategoryList'

const render = ({ listProps, store } = {}) =>
  renderWithStore(<CategoryList {...listProps} />, {
    store: getState(store)
  })

const categories = getFixture(FIXTURE_NAMES.categories).result

describe('<CategoryList />', () => {
  it('renders a loading state', () => {
    render({})

    expect(screen.getAllByTestId('CategorySkeleton')).toHaveLength(6)
  })

  describe('happy paths', () => {
    let rendered

    beforeEach(() => {
      rendered = render({
        listProps: { bills, deposits, unplanned },
        store: {
          app: {
            categories
          },
          ui: {
            dashboard: {
              isLoading: {
                categoryList: false
              }
            }
          }
        }
      })
    })

    it('renders the CategoryList properly', () => {
      expect(screen.queryAllByRole('listitem')).toBeArrayOfSize(33)

      categories.forEach(category => {
        expect(screen.getByText(category.name)).toBeInTheDocument()
      })
    })

    it('displays bills categories - when clicking bills filter', async () => {
      userEvent.selectOptions(screen.getByRole('combobox'), 'BILLS')

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveValue('BILLS')
      })

      expect(screen.queryAllByRole('listitem')).toBeArrayOfSize(16)

      categories.forEach(category => {
        if (category.isBill) {
          expect(screen.getByText(category.name)).toBeInTheDocument()
        }
      })
    })

    it('displays deposits categories - when clicking deposits filter', async () => {
      userEvent.selectOptions(screen.getByRole('combobox'), 'DEPOSITS')

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveValue('DEPOSITS')
      })

      expect(screen.queryAllByRole('listitem')).toBeArrayOfSize(1)

      categories.forEach(category => {
        if (category.isDeposit) {
          expect(screen.getByText(category.name)).toBeInTheDocument()
        }
      })
    })

    it('displays unplanned categories - when clicking unplanned filter', async () => {
      userEvent.selectOptions(screen.getByRole('combobox'), 'UNPLANNED')

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveValue('UNPLANNED')
      })

      expect(screen.queryAllByRole('listitem')).toBeArrayOfSize(16)

      categories.forEach(category => {
        if (!category.isDeposit && !category.isBill) {
          expect(screen.getByText(category.name)).toBeInTheDocument()
        }
      })
    })

    it('opens a modal with prefilled inputs - when editing a category', () => {
      const { getByText, getByLabelText, getByDisplayValue } = screen

      userEvent.click(getByText('Income'))

      const nameInput = getByLabelText('Name')

      expect(nameInput).toBeInTheDocument()
      expect(nameInput.value).toBe('Income')

      const depositCheckbox = getByLabelText('Deposit?')

      expect(depositCheckbox).toBeInTheDocument()
      expect(depositCheckbox.checked).toBeTrue()
    })

    it('makes an xhr request to edit category - when editing category', async () => {
      const { getByText, getByLabelText, getAllByText } = screen

      userEvent.click(getByText('Income'))

      const nameInput = getByLabelText('Name')
      const depositCheckbox = getByLabelText('Deposit?')

      userEvent.type(nameInput, 's')
      expect(nameInput.value).toBe('Incomes')

      userEvent.click(depositCheckbox)

      expect(depositCheckbox.checked).toBeFalse()

      const modal = getByLabelText('Edit Category Modal', {
        selector: '[role="presentation"]'
      })

      expect(modal).toHaveClass('is-visible')

      userEvent.click(getAllByText('Submit')[0])

      await waitFor(() => {
        expect(modal).not.toHaveClass('is-visible')
      })
    })

    it('clears all fields when clicking secondary button - when editing category', () => {
      const { getByText, getByLabelText, getAllByText } = screen

      userEvent.click(getByText('Income'))

      const nameInput = getByLabelText('Name')
      const depositCheckbox = getByLabelText('Deposit?')

      userEvent.type(nameInput, 's')
      expect(nameInput.value).toBe('Incomes')

      userEvent.click(getAllByText('Clear')[0])

      expect(getByLabelText('Name').value).toBe('')

      expect(depositCheckbox.checked).toBeFalse()
    })

    it('dismounts fields on modal close - when editing category', async () => {
      const { getByText, getAllByTitle, queryByLabelText } = screen

      userEvent.click(getByText('Income'))

      userEvent.click(getAllByTitle('Close')[0])

      await waitFor(() => {
        expect(queryByLabelText('Name')).toBeFalsy()
      })
    })
  })
})
