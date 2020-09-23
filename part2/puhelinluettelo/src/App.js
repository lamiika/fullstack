import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [ searchInput, setSearchInput ] = useState('')
  const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')

	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
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
    
    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  
  const removePerson = (event, id, name) => {
    event.preventDefault()
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(remainingPersons => {
        setPersons(remainingPersons)
      })
    }
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
			<Persons filterNames={filterNames} removePerson={removePerson} />
    </div>
  )
}

export default App