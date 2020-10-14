import React from 'react'
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

export default Notification