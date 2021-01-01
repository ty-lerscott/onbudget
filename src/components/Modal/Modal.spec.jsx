import React from 'react'
import { screen, userEvent, render, buildFakeModel, fake } from '@tsw38/otis'

import Modal from './Modal'

const buildModalProps = buildFakeModel('ModalProps', {
  fields: {
    isOpen: true,
    isSubmitting: false,
    handlePrimaryClick: jest.fn(),
    handleSecondaryClick: jest.fn(),
    title: fake(f => f.random.words(2))
  }
})

describe('<Modal />', () => {
  const props = buildModalProps()

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('renders properly', () => {
    render(<Modal {...props} />)

    expect(
      screen.getByRole('heading', {
        text: props.title
      })
    ).toBeInTheDocument()

    expect(screen.getAllByLabelText(`${props.title} Modal`)).toBeArrayOfSize(2)
  })

  it('changes the primary button text when the modal is submitting content', async () => {
    const { rerender } = render(<Modal {...props} />)

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()

    rerender(<Modal {...props} isSubmitting={true} />)

    expect(screen.queryByRole('button', { name: 'Submit' })).toBeNull()
    expect(
      screen.getByLabelText('Active loading indicator')
    ).toBeInTheDocument()
  })

  it('closes modal and triggers complete action when closing modal', async () => {
    const handleCloseModal = jest.fn(() => Promise.resolve)
    const handleCloseModalComplete = jest.fn()

    render(
      <Modal
        {...props}
        handleCloseModal={handleCloseModal}
        handleCloseModalComplete={handleCloseModalComplete}
      />
    )

    const modal = screen.getByLabelText(`${props.title} Modal`, {
      selector: '[role="presentation"]'
    })

    expect(modal).toHaveClass('is-visible')

    userEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(handleCloseModal).toBeCalled()
  })
})
