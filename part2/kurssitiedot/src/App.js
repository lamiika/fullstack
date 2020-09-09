import React from 'react'
import Courses from './components/Courses'

const App = ({ courses }) => (
	<div>
		<Courses courses={courses} />
	</div>
)

export default App