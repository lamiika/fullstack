import React from 'react'
import Country from './Country'

const Countries = ({ filterCountries }) => {
  if (filterCountries.length > 10) {
    return <p>too many</p>
  } else if (filterCountries.length === 1) {
    return <Country country={filterCountries[0]} />
  }

  return (
    <div>
      {filterCountries.map(country =>
        <p key={country.name}>{country.name}</p>
      )}
    </div>
  )
}

export default Countries