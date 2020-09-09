import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
			<Filter searchInput={searchInput} setSearchInput={setSearchInput} />
			<h3>add a new</h3>
			<PersonForm 
				newName={newName} setNewName={setNewName} 
				newNumber={newNumber} setNewNumber={setNewNumber}
				addPerson={addPerson}
			/>
      <h3>Numbers</h3>
			<Persons filterNames={filterNames} />
    </div>
  )
}

export default App