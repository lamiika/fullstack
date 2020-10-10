import React from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'

const App = ({ store }) => {

  return  (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App