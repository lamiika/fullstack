import React from 'react'
import Course from './Course'

const Header = ({ title }) => (
  <h1>{title}</h1>
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

export default Courses