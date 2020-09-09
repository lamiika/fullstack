import React from 'react'
import Person from './Person'

const Persons = ({ filterNames }) => (
	<div>
		{filterNames.map(person =>
			<Person name={person.name} number={person.number} key={person.id} />
		)}
	</div>
)

export default Persons