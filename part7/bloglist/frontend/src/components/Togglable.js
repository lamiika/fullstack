import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Collapse
} from '@material-ui/core'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const childElements = React.Children.map(props.children, child => {
    if (child.type.name === 'BlogForm') {
      return (
        React.cloneElement(child, {
          toggleVisibility
        })
      )
    }
    return child
  })

  return (
    <div>
      <Collapse in={visible} timeout="auto" unmountOnExit>
        {childElements}
        <Button color="primary" onClick={toggleVisibility}>
          cancel
        </Button>
      </Collapse>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable