import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(false)

  useEffect(() => {
    const address = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`

    if (name) {
      axios.get(address)
      .then(response => {
        setCountry(response.data[0])
        setFound(true)
      })
      .catch((exception) => {
        console.log(exception)
        setCountry(exception)
        setFound(false)
      })
    }
  }, [name])

  if (country) {
    return {
      data: country,
      found
    }
  }

  return null
}