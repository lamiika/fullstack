import React from 'react'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) {
    return (
      <p style={style}>{notification}</p>
    )
  }

  return null
}

export default Notification