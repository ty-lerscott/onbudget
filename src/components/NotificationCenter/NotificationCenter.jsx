import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { useEffect, useRef } from 'react'

import './NotificationCenter.scss'

import { dequeueNotification } from './NotificationActions'

import Notification from './Notification'

import { NotificationProps } from 'definitions'

const NotificationCenter = ({ dequeue, notifications }) => {
  const memoDequeue = useRef(() => dequeue()).current

  useEffect(() => {
    if (notifications.length) {
      setTimeout(() => {
        memoDequeue()
      }, 3000)
    }
  }, [notifications, memoDequeue])

  return (
    <div className='NotificationCenter'>
      <div className='Notification-List'>
        {notifications.map((notification, key) => (
          <Notification key={`Notification-${key}`} {...notification} />
        ))}
      </div>
    </div>
  )
}

NotificationCenter.propTypes = {
  dequeue: PropTypes.func,
  notifications: PropTypes.arrayOf(NotificationProps)
}

const mapDispatchToProps = {
  dequeue: dequeueNotification
}

const mapStateToProps = state => ({
  notifications: state.notifications
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCenter)
