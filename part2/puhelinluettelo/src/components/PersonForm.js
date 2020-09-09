import React from 'react'

const PersonForm = (props) => {
	const { newName, setNewName, newNumber, 
		setNewNumber, addPerson } = props

	return (
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
	)
}

export default PersonForm