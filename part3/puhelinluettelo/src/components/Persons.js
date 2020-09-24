import React from 'react'
import Person from './Person'

const Persons = ({ filterNames, removePerson }) => (
	<div>
		{filterNames.map(person =>
			<Person name={person.name} 
				number={person.number} key={person.id}
				removePerson={removePerson} id={person.id} />
		)}
	</div>
)

export default Persons