import React, { useEffect } from 'react'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'
import Notes from './components/Notes'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = ({ store }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return  (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App