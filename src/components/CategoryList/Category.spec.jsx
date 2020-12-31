import React from 'react'
import { render } from '@testing-library/react'

import Category from './Category'

const setup = props => {
  const allProps = {
    name: '',
    total: 0,
    quantity: 0,
    color: '#cccccc',
    handleOnClick: jest.fn(),
    ...props
  }

  return {
    handleOnClick: allProps.handleOnClick,
    selectors: render(<Category {...allProps} />)
  }
}

describe('<Category />', () => {
  it('does not render without a category name', () => {
    const {
      selectors: { queryByRole }
    } = setup()

    expect(queryByRole('listitem')).toBeFalsy()
  })

  describe('rendering correctly', () => {
    const category = {
      name: 'Target',
      total: 42.33,
      quantity: 10
    }

    it('renders all content correctly (plural quantity)', () => {
      const {
        selectors: { getByText }
      } = setup(category)

      expect(getByText(category.name)).toBeInTheDocument()
      expect(getByText(`${category.quantity} transactions`)).toBeInTheDocument()
      expect(getByText(`$${category.total}`)).toBeInTheDocument()
    })

    it('renders all content correctly (singular quantity)', () => {
      const {
        selectors: { getByText }
      } = setup({
        ...category,
        quantity: 1
      })

      expect(getByText('1 transaction')).toBeInTheDocument()
    })
  })
})
