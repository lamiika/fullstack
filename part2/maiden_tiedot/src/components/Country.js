import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  if (Object.keys(country).length === 0 && country.constructor === Object) {
    return <></>
  }
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {Object.keys(country.languages).map(language =>
          <li key={country.languages[language].name}>{country.languages[language].name}</li>
        )}
      </ul>
      <img src={country.flag} alt="Country flag" width="15%" height="15%" />
      <Weather city={country.capital} />
    </div>
  )
}

export default Country