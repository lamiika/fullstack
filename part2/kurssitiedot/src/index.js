import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => (
  <h1>{title}</h1>
)


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

const Courses = ({ courses }) => {
  const content = courses.courses.map((item, i) =>
      <Course course={item} key={item.id} />
    )
  
  return (
  <>
    <Header title={courses.name} />
    {content}
  </>
  )
}

const App = () => {
  const courses = {
    name: 'Web development curriculum',
    courses: [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  }

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))