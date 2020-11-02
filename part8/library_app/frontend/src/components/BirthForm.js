import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../queries'

const BirthForm = ({ authors }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const [changeBirthYear, result] = useMutation(EDIT_AUTHOR)

  const names = authors.map(a => a.name)
  const options = names.reduce((accumulator, currentValue) => {
    return [ ...accumulator, { value: currentValue, label: currentValue } ]
  }, [])

  const submit = (event) => {
    event.preventDefault()

    changeBirthYear({ variables: {
      name: selectedOption.value,
      born: Number(born)
    }})

    setSelectedOption(null)
    setBorn('')
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthForm