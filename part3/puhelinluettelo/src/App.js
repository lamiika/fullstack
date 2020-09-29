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
  const [ messageStyle, setMessageStyle ] = useState({
    color: 'blue',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  })

	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
  }, [])

  const showNotification = (content, color, time) => {
    setMessage(content)
    setMessageStyle({ ...messageStyle, color: color })
    setTimeout(() => {
      setMessage(null)
    }, time * 1000)
  }

	const filterNames = persons.filter(person => 
		person.name.toLowerCase().includes(searchInput.toLowerCase()))

	const addPerson = (event) => {
		event.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber
    }
    
    const duplicate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (duplicate) {
      updateNumber(personObject, duplicate)
    } else {
      personService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(returnedPersons)
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${personObject.name}`, 'green', 2)
        })
        .catch(error => {
          showNotification(error.response.data.error, 'red', 4)
        })
    }
  }

  const updateNumber = (personObject, duplicate) => {
    if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .updateNumber(personObject, duplicate)
        .then(updatedPersons => {
          setPersons(updatedPersons)
          setNewName('')
          setNewNumber('')
          showNotification(`Updated ${personObject.name}'s phone number`, 'green', 2)
        })
        .catch(error => {
          showNotification(`Information of ${personObject.name} has already been removed from server`, 'red', 4)
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
        showNotification(`Deleted ${name} from phonebook`, 'green', 2)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={messageStyle} />
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