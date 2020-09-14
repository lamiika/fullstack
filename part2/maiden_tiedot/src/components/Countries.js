import React from 'react'
import Country from './Country'
import Button from './Button'

const Countries = ({ filterCountries, countryDetails, setCountryDetails }) => {
  const showCountryDetails = (country) => (event) => {
    event.preventDefault()
    setCountryDetails(country)
  }

  if (filterCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filterCountries.length === 1) {
    return <Country country={filterCountries[0]} />
  }

  return (
    <div>
    <Country country={countryDetails} />
      <div>
        {filterCountries.map(country =>
          <p key={country.name}>{country.name}<Button text="show" handleClick={showCountryDetails(country)} /></p>
        )}
      </div>
    </div>
  )
}

export default Countries