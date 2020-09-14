import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [ searchInput, setSearchInput ] = useState('')
  const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}, [])
	
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