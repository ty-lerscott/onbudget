import React from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'

import { ToastNotification } from 'carbon-components-react'

import { deleteNotification } from './NotificationActions'

import { NotificationProps } from 'definitions'

const Notification = ({
	id,
	subtitle = '',
	type = 'info',
	deleteThisNotification,
	...props
}) => {
	const handleDelete = () => {
		deleteThisNotification(id)
	}

	const title = props.title || type[0].toUpperCase() + type.substr(1)

	return (
		<ToastNotification
			className={cn('Notification', `Notification--${type}`)}
			kind={type}
			lowContrast
			role='alert'
			title={title}
			caption={false}
			subtitle={subtitle}
			onCloseButtonClick={handleDelete}
		/>
	)
}

Notification.propTypes = NotificationProps

const mapDispatchToProps = {
	deleteThisNotification: deleteNotification
}

export default connect(null, mapDispatchToProps)(Notification)
