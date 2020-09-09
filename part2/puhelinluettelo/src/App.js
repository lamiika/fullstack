import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244', id: 'Arto Hellas' }
  ]) 
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	
	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber,
			id: newName
		}

		persons.find(person => person.name === newName) 
			? alert(`${newName} is already added to phonebook`)
			: setPersons(persons.concat(personObject))
		
		setNewName('')
		setNewNumber('')
		console.log(persons)
	}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
						value={newName}
						onChange={(event) => setNewName(event.target.value)}
					/>
        </div>
				<div>
					number: <input
						value={newNumber}
						onChange={(event) => setNewNumber(event.target.value)}
					/>
				</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
			<div>
				{persons.map(person =>
					<Person name={person.name} number={person.number} key={person.id} />
				)}
			</div>
    </div>
  )

}

export default App