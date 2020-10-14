import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const style = useSelector(state => state.notification.style)

  if (message === null) {
    return null
  }

  return (
    <div style={style} className="notification">
      {message}
    </div>
  )
}

Notification.propTypes = {
  style: PropTypes.object.isRequired
}

export default Notification