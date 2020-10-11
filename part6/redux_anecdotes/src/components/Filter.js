import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <form style={style}>
      filter
      <input onChange={handleChange} />
    </form>
  )
}

export default Filter