import React from 'react'

const SubHeader = ({ course }) => (
	<h2>{course}</h2>
)

const Part = ({ part }) => (
	<p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => {
	const content = parts.map((item, i) =>
		<Part part={item} key={item.id} />
	)

	return (
		<>
			{content}
		</>
	)
}

const Total = ({ parts }) => {
	const sum = parts.reduce((accumulator, value) => 
														accumulator + value.exercises, 0)

	return (
		<p><b>total of {sum} exercises</b></p>
	)
}

const Course = ({ course }) => (
	<>
		<SubHeader course={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</>
)

export default Course