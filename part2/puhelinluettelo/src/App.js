import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 'Arto Hellas' }
  ]) 
	const [ newName, setNewName ] = useState('')
	
	const addName = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			id: newName
		}

		setPersons(persons.concat(personObject))
		setNewName('')
		console.log(persons)
	}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
						value={newName}
						onChange={(event) => setNewName(event.target.value)}
					/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
			<div>
				{persons.map(person =>
					<Person name={person.name} key={person.id} />
				)}
			</div>
    </div>
  )

}

export default App