import React from 'react'

const Person = ({ name, number, removePerson, id}) => (
	<div>
		{name} {number}
		<button onClick={(event) => removePerson(event, id)}>delete</button>
	</div>
)

export default Person