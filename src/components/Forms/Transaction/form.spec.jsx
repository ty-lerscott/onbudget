import React from 'react'
import {
  fake,
  screen,
  advanceTo,
  userEvent,
  clearDateMock,
  buildFakeModel,
  waitFor
} from '@tsw38/otis'

import {
  getState,
  renderWithStore,
  getFixture,
  FIXTURE_NAMES
} from '__test__/utils'

import Form from './form'

const buildDescription = buildFakeModel('Word', {
  fields: {
    description: fake(f => f.random.words(2))
  }
})

const render = ({ props, store } = {}) => {
  const resetParentModal = jest.fn()

  return renderWithStore(
    <Form {...props} isOpen={true} resetParentModal={resetParentModal} />,
    { store: getState(store) }
  )
}

const labels = {
  date: 'Date *',
  amount: 'Amount *',
  category: 'Category *',
  description: 'Description'
}

describe('<AddTransactionForm />', () => {
  beforeEach(() => {
    advanceTo(new Date(2020, 10, 5))
  })

  afterEach(() => {
    clearDateMock()
  })

  it('renders correctly', () => {
    render()

    expect(
      screen.getByRole('heading', { text: 'Add Transaction' })
    ).toBeInTheDocument()

    Object.keys(labels).forEach(key => {
      expect(screen.getByLabelText(labels[key])).toBeInTheDocument()
    })
  })

  it('clears the form when clicking the button', async () => {
    const categories = getFixture(FIXTURE_NAMES.categories).result

    render({
      store: {
        app: {
          categories
        }
      }
    })

    const amountInput = () => screen.getByLabelText(labels.amount)
    const categoryInput = () => screen.getByLabelText(labels.category)

    // amount
    expect(amountInput()).toHaveValue(0)
    userEvent.type(amountInput(), '10')
    expect(amountInput()).toHaveValue(10)

    // category
    const amazonCategory = categories.find(
      category => category.name === 'Amazon'
    )
    userEvent.selectOptions(categoryInput(), amazonCategory.name)

    userEvent.click(screen.getByRole('button', { name: 'Clear' }))

    await waitFor(() => {
      expect(amountInput()).toHaveValue(0)
    })
  })

  it('successfully submits the form', async () => {
    const categories = getFixture(FIXTURE_NAMES.categories).result

    render({
      store: {
        app: {
          categories
        }
      }
    })

    const amountInput = () => screen.getByLabelText(labels.amount)
    const categoryInput = () => screen.getByLabelText(labels.category)
    const descriptionInput = () => screen.getByLabelText(labels.description)

    // amount
    expect(amountInput()).toHaveValue(0)
    userEvent.type(amountInput(), '10')
    expect(amountInput()).toHaveValue(10)

    // category
    const amazonCategory = categories.find(
      category => category.name === 'Amazon'
    )

    expect(categoryInput()).toHaveValue('')
    userEvent.selectOptions(categoryInput(), amazonCategory.name)
    expect(categoryInput()).toHaveValue(amazonCategory.id)

    // skipping date since it is prefilled

    // description
    const fakeDescription = buildDescription().description
    expect(descriptionInput()).toHaveValue('')
    userEvent.type(descriptionInput(), fakeDescription)
    expect(descriptionInput()).toHaveValue(fakeDescription)

    expect(
      screen.getByLabelText('Add Transaction Modal', {
        selector: '[role="presentation"]'
      })
    ).not.toHaveClass('Modal--disabled')

    userEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(
        screen.queryByLabelText('Active loading indicator')
      ).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Submit' })
      ).toBeInTheDocument()
    })
  })
})
