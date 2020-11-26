import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { useEffect } from 'react'

import Modal from 'components/Modal/Modal'

import Fields from './fields'
import useFormReducer, { getInitialState } from './state'

import { enqueueNotification } from 'components/NotificationCenter/NotificationActions'

import {
  clearReduxState,
  fetchTransactions,
  editTransactionAction
} from 'actions/TransactionActions'

const EditTransaction = ({
  notify,
  isOpen, //TODO: change this to `isModalOpen`
  clearRedux,
  editTransaction,
  getTransactions,
  initialFormValues,
  modalTitle = 'Edit Transaction'
}) => {
  const [
    {
      values,
      state: { isModalOpen, isSubmitting, areFieldsMounted }
    },
    { setFormValues, setIsModalOpen, setIsSubmitting, setAreFieldsMounted }
  ] = useFormReducer({ isModalOpen: isOpen, initialFormValues })

  /* eslint-disable react-hooks/exhaustive-deps */

  // parent says it's open
  useEffect(() => {
    if (isOpen) {
      setFormValues(initialFormValues)
      setAreFieldsMounted(true)
    }

    setIsModalOpen(isOpen)
  }, [isOpen])

  //   // self says it's closed
  //   useEffect(() => {
  //     if (!isModalOpen && resetParentModal) {
  //       resetParentModal()
  //     }
  //   }, [isModalOpen])
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleCloseModal = () => {
    setIsModalOpen(false)
    return
  }

  const handleSubmitForm = () => {
    setIsSubmitting(true)

    const { category, ...body } = values

    editTransaction(body)
      .then(resp => {
        if (!resp?.errors) {
          handleCloseModal()
          notify({
            type: 'success',
            subtitle: 'You successfully edited an transaction'
          })

          getTransactions()
          setFormValues(getInitialState().values)
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleClearForm = () => {
    setFormValues(getInitialState().values)
  }

  const resetReduxState = () => {
    clearRedux()
    setAreFieldsMounted()
  }

  return (
    <Modal
      isScrollable
      title={modalTitle}
      isOpen={isModalOpen}
      isSubmitting={isSubmitting}
      handleCloseModal={handleCloseModal}
      handlePrimaryClick={handleSubmitForm}
      handleSecondaryClick={handleClearForm}
      handleCloseModalComplete={resetReduxState}
      isDisabled={
        isSubmitting || !values.amount || !values.date || !values.categoryId
      }>
      {areFieldsMounted && (
        <Fields setFormValues={setFormValues} formValues={values} />
      )}
    </Modal>
  )
}

EditTransaction.propTypes = {
  notify: PropTypes.func,
  isOpen: PropTypes.bool,
  clearRedux: PropTypes.func,
  modalTitle: PropTypes.string,
  editTransaction: PropTypes.func,
  getTransactions: PropTypes.func,
  resetParentModal: PropTypes.func,
  initialFormValues: PropTypes.object
}

const mapDispatchToProps = {
  notify: enqueueNotification,
  clearRedux: clearReduxState,
  getTransactions: fetchTransactions,
  editTransaction: editTransactionAction
}

const mapStateToProps = state => ({
  initialFormValues: state.ui.transactionHistory.modal.edit,
  isOpen: !!Object.keys(state.ui.transactionHistory.modal.edit).length
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTransaction)
