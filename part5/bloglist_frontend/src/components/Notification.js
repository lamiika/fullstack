import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, style }) => {
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