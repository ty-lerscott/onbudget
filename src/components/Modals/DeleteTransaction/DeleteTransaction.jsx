import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'

import Modal from 'components/Modal/Modal'

import { closeModalAction } from './actions'
import { deleteTransactionAction } from 'actions/TransactionActions'
import { enqueueNotification } from 'components/NotificationCenter/NotificationActions'

const DeleteTransactionModal = ({
  isOpen,
  notify,
  closeModal,
  transactionId,
  deleteTransaction
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDeleteTransaction = () => {
    setIsSubmitting(true)
    deleteTransaction(transactionId)
      .then(({ errors } = {}) => {
        if (errors?.length) {
        } else {
          closeModal()
          notify({
            type: 'success',
            subtitle: 'You have successfully deleted a transaction.'
          })
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      title='Delete Transaction'
      primaryButtonText='Confirm'
      secondaryButtonText='Cancel'
      handleCloseModal={closeModal}
      handleSecondaryClick={closeModal}
      handlePrimaryClick={handleDeleteTransaction}>
      <p>Are you sure you want to delete this transaction?</p>
    </Modal>
  )
}

DeleteTransactionModal.propTypes = {
  isOpen: PropTypes.bool,
  notify: PropTypes.func,
  closeModal: PropTypes.func,
  deleteTransaction: PropTypes.func,
  transactionId: PropTypes.string.isRequired
}

const mapDispatchToProps = {
  notify: enqueueNotification,
  closeModal: closeModalAction,
  deleteTransaction: deleteTransactionAction
}

const mapStateToProps = state => ({
  transactionId: state.ui.transactionHistory.id,
  isOpen: state.ui.transactionHistory.modal.delete,
  isSubmitting: state.ui.transactionHistory.isSubmitting
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteTransactionModal)
