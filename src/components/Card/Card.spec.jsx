import React from 'react'
import { render } from '@testing-library/react'

import Card from './Card'

const setup = props => {
  return render(<Card {...props} />)
}

describe('<Card />', () => {
  it('doesnt render if no children', () => {
    const { queryByTestId } = setup()

    expect(queryByTestId('Card')).toBeFalsy()
  })

  describe('title heading', () => {
    it('renders - given the title props', () => {
      const title = 'Test Title'

      const { getByText } = setup({
        title,
        children: <></>
      })

      expect(getByText(title)).toBeInTheDocument()
    })

    it('renders - given the optional header content', () => {
      const { getByText } = setup({
        optionalContent: <p>Hello World</p>,
        children: <></>
      })

      expect(getByText('Hello World')).toBeInTheDocument()
    })
  })

  describe('wrapped state', () => {
    it('renders with wrapped content given children and wrapped prop', () => {
      const { getByTestId } = setup({
        wrapped: true,
        children: <></>
      })

      expect(getByTestId('Card-ContentWrapper')).toBeInTheDocument()
    })

    it('renders without wrapped content given children', () => {
      const { queryByTestId } = setup({
        children: <></>
      })

      expect(queryByTestId('Card-ContentWrapper')).toBeFalsy()
    })
  })

  it('renders children', () => {
    const testString = 'Hello World'

    const { getByText } = setup({
      children: (
        <>
          <h1>{testString}</h1>
        </>
      )
    })

    expect(getByText(testString)).toBeInTheDocument()
  })
})
