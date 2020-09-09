import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
	const [ searchInput, setSearchInput ] = useState('')
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	
	const filterNames = persons.filter(person => 
		person.name.toLowerCase().includes(searchInput.toLowerCase()))

	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber,
			id: newName
		}

		persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
			? alert(`${newName} is already added to phonebook`)
			: setPersons(persons.concat(personObject))
		
		setNewName('')
		setNewNumber('')
		console.log(persons)
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<form>
				<div>
					filter shown with <input
						value={searchInput}
						onChange={(event) => setSearchInput(event.target.value)}
					/>
				</div>
			</form>
			<h2>add a new</h2>
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
				{filterNames.map(person =>
					<Person name={person.name} number={person.number} key={person.id} />
				)}
			</div>
    </div>
  )

}

export default App