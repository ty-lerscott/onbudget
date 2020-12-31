import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { useEffect } from 'react'

import Fields from './fields'
import useFormReducer from './state'

import Modal from 'components/Modal/Modal'

import {
  fetchTransactions,
  importStatementAction
} from 'actions/TransactionActions'
import { enqueueNotification } from 'components/NotificationCenter/NotificationActions'

import './fields.scss'

const modalTitle = 'Import Statement'

const ImportStatementForm = ({
  getTransactions,
  isOpen,
  notify,
  resetParentModal,
  importStatement
}) => {
  const [
    {
      values,
      state: { isModalOpen, isSubmitting, areFieldsMounted }
    },
    { setFormValues, setIsModalOpen, setIsSubmitting, setAreFieldsMounted }
  ] = useFormReducer({ isModalOpen: isOpen })

  /* eslint-disable react-hooks/exhaustive-deps */
  // parent says it's open
  useEffect(() => {
    if (isOpen) {
      setAreFieldsMounted(true)
    }

    setIsModalOpen(isOpen)
  }, [isOpen])

  // self says it's closed
  useEffect(() => {
    if (!isModalOpen) {
      resetParentModal()
    }
  }, [isModalOpen])
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleCloseModal = () => {
    setIsModalOpen(false)

    return
  }

  const handleSubmitForm = () => {
    if (!hasSetFormValues()) {
      return
    }

    setIsSubmitting(true)

    importStatement(values)
      .then(resp => {
        if (!resp?.errors) {
          handleCloseModal()

          notify({
            type: 'success',
            subtitle: 'You successfully imported transactions'
          })

          getTransactions()
          setFormValues([])
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleClearForm = () => {
    setFormValues([])
  }

  const hasSetFormValues = () => Array.isArray(values) && !!values.length

  return (
    <Modal
      isScrollable
      title={modalTitle}
      isOpen={isModalOpen}
      isSubmitting={isSubmitting}
      handleCloseModal={handleCloseModal}
      handlePrimaryClick={handleSubmitForm}
      handleSecondaryClick={handleClearForm}
      handleCloseModalComplete={setAreFieldsMounted}
      isDisabled={isSubmitting || !hasSetFormValues()}>
      <div className='ImportStatementForm' data-testid='ImportStatementForm'>
        <div className='Row'>
          <p className='bx--label-description no-margin'>
            Please format the file in this order "date", "description", "debit",
            "credit", "category"
          </p>
        </div>
        <div className='Row'>
          {areFieldsMounted && (
            <Fields formValues={values} setFormValues={setFormValues} />
          )}
        </div>
      </div>
    </Modal>
  )
}

ImportStatementForm.propTypes = {
  isOpen: PropTypes.bool,
  notify: PropTypes.func,
  importStatement: PropTypes.func,
  getTransactions: PropTypes.func,
  resetParentModal: PropTypes.func
}

const mapDispatchToProps = {
  notify: enqueueNotification,
  getTransactions: fetchTransactions,
  importStatement: importStatementAction
}

export default connect(null, mapDispatchToProps)(ImportStatementForm)
