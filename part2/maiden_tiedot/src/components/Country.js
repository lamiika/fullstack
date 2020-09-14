import React from 'react'

const Country = ({ country }) => {
  if (Object.keys(country).length === 0 && country.constructor === Object) {
    return <></>
  }
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.keys(country.languages).map(language =>
          <li key={country.languages[language].name}>{country.languages[language].name}</li>
        )}
      </ul>
      <img src={country.flag} alt="Country flag" width="15%" height="15%" />
    </div>
  )
}

export default Country