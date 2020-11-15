import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from 'carbon-components-react'

import Page from 'components/Page/Page'
import Modal from 'components/Modal/Modal'

import './styles.scss'

const ForgotPassword = ({
	error,
	values,
	setState,
	isDisabled,
	isSubmitting,
	handleClearForm,
	hasSubmittedOnce,
	handleSubmitForm
}) => {
	return (
		<Page name='ForgotPassword'>
			<Modal
				isOpen
				isScrollable
				title='Forgot Password'
				isDisabled={isDisabled}
				isSubmitting={isSubmitting}
				passiveModal={hasSubmittedOnce}
				handlePrimaryClick={handleSubmitForm}
				handleSecondaryClick={handleClearForm}
				handleCloseModalComplete={handleClearForm}>
				{hasSubmittedOnce ? (
					<span className='pending'>
						You will receive an email in order to reset your
						password shortly.
					</span>
				) : (
					<>
						<p className='cta'>Please enter your email address.</p>
						<div className='form'>
							<TextInput
								id='email'
								labelText='Email'
								value={values.email}
								onChange={setState('email')}
							/>
						</div>

						{error && (
							<div className='ErrorWrapper'>
								<p className='bx--label error'>{error}</p>
							</div>
						)}
					</>
				)}
			</Modal>
		</Page>
	)
}

ForgotPassword.propTypes = {
	error: PropTypes.string,
	isDisabled: PropTypes.bool,
	isSubmitting: PropTypes.bool,
	handleClearForm: PropTypes.func,
	handleSubmitForm: PropTypes.func,
	hasSubmittedOnce: PropTypes.bool,
	setState: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired
}

export default ForgotPassword
