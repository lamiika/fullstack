import React from 'react'

const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={style} className="error">
      {message}
    </div>
  )
}

export default Notification