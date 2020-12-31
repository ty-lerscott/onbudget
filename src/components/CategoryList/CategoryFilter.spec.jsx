import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import CategoryFilter from './CategoryFilter'

const setup = props => {
  return render(<CategoryFilter {...props} />)
}

describe('<CategoryFilter />', () => {
  it('does not render without a category name', () => {
    const { queryByLabelText } = setup()

    expect(queryByLabelText('Filter')).toBeFalsy()
  })

  describe('happy path', () => {
    let setFilter = jest.fn()
    let selectors

    beforeEach(() => {
      selectors = setup({
        setFilter
      })
    })

    it('renders select dropdown properly', () => {
      const { getByLabelText, getByText } = selectors

      expect(getByLabelText('Filter')).toBeInTheDocument()
      ;['All', 'Bills', 'Deposits'].forEach(option => {
        expect(getByText(option)).toBeInTheDocument()
      })
    })

    it('selecting an option properly calls passed down setFilter', async () => {
      const { getByRole } = selectors

      fireEvent.change(getByRole('combobox'), {
        target: { value: 'temp' }
      })

      expect(setFilter).toBeCalledTimes(1)
    })
  })
})
