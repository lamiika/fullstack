import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
	const [ searchInput, setSearchInput ] = useState('')
  const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState(null)

	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
  }, [])

  const showNotification = (content) => {
    setMessage(
      content
    )
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

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
      updateNumber(personObject)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${personObject.name}`)
        })
    }
  }

  const updateNumber = (personObject) => {
    if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
      console.log('hey')
      personService
        .updateNumber(personObject)
        .then(updatedPersons => {
          setPersons(updatedPersons)
          setNewName('')
          setNewNumber('')
          showNotification(`Updated ${personObject.name}'s phone number`)
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
        showNotification(`Deleted ${name} from phonebook`)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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