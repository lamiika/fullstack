import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(
    state => state.notification.slice(-1)[0] // shows the most recent notification
  )

  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  return null
}

export default Notification