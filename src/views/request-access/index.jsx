import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from 'carbon-components-react'

import Page from 'components/Page/Page'
import Modal from 'components/Modal/Modal'

import './styles.scss'

const RequestAccess = ({
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
		<Page name='RequestAccess'>
			<Modal
				isOpen
				isScrollable
				title='Request Access'
				isDisabled={isDisabled}
				isSubmitting={isSubmitting}
				passiveModal={hasSubmittedOnce}
				handlePrimaryClick={handleSubmitForm}
				handleSecondaryClick={handleClearForm}
				handleCloseModalComplete={handleClearForm}>
				{hasSubmittedOnce ? (
					<>
						<p className='submission-message'>
							<strong>Thank you for signing up!</strong>
						</p>
						<span className='pending'>
							If approved, you'll get an email shortly to set your
							password.
						</span>
					</>
				) : (
					<>
						<p className='cta'>
							Let me know if you are interested in trying this app
							out.
						</p>
						<div className='form'>
							<div className='Row'>
								<TextInput
									id='firstName'
									labelText='First Name'
									value={values.firstName}
									onChange={setState('firstName')}
								/>
								<TextInput
									id='lastName'
									labelText='Last Name'
									value={values.lastName}
									onChange={setState('lastName')}
								/>
							</div>
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

RequestAccess.propTypes = {
	error: PropTypes.string,
	isDisabled: PropTypes.bool,
	isSubmitting: PropTypes.bool,
	handleClearForm: PropTypes.func,
	handleSubmitForm: PropTypes.func,
	hasSubmittedOnce: PropTypes.bool,
	setState: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired
}

export default RequestAccess
