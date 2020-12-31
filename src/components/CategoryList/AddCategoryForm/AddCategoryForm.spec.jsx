import React from 'react'
import { waitFor, userEvent, screen } from '@tsw38/otis'

import AddCategoryForm from './AddCategoryForm'
import { renderWithStore, getState } from '__test__/utils'

const render = (store = {}) =>
  renderWithStore(<AddCategoryForm />, { store: getState(store) })

describe('<AddCategoryForm />', () => {
  beforeEach(() => {
    render()
  })

  it('on initial render, fields arent mounted in modal', () => {
    expect(screen.queryByTestId('CategoryFormFields')).toBeNull()
  })

  it('renders fields after clicking button', () => {
    const { queryByTestId, getByRole } = screen

    expect(queryByTestId('CategoryFormFields')).toBeNull()

    userEvent.click(getByRole('button', { name: 'Add Category' }))

    expect(queryByTestId('CategoryFormFields')).toBeInTheDocument()
  })

  it('closes the modal when clicking the close button', async () => {
    const { getByTitle, getByRole, queryByTestId } = screen

    userEvent.click(getByRole('button', { name: 'Add Category' }))

    userEvent.click(getByTitle('Close'))

    await waitFor(() => {
      expect(queryByTestId('CategoryFormFields')).toBeNull()
    })
  })

  it('makes an xhr request when properly submitting form', async () => {
    const { getByLabelText, getByRole, queryByRole } = screen

    userEvent.click(getByRole('button', { name: 'Add Category' }))

    let nameInput
    await waitFor(() => {
      expect(getByLabelText('Name')).toBeInTheDocument()
      nameInput = getByLabelText('Name')
    })

    const addCategoryModal = getByLabelText('Add Category Modal', {
      selector: '[role="presentation"]'
    })

    expect(addCategoryModal).toHaveClass('Modal--disabled')

    userEvent.type(nameInput, 'Test')

    expect(nameInput).toHaveDisplayValue('Test')

    expect(addCategoryModal).not.toHaveClass('Modal--disabled')

    userEvent.click(getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(queryByRole('button', { name: 'Submit' })).toBeNull()
    })

    await waitFor(() => {
      expect(queryByRole('button', { name: 'Submit' })).toBeInTheDocument()
    })
  })
})
