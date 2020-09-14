import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState({})
  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  const api_url = `http://api.weatherstack.com/current` +
    `?access_key=${api_key}` +
    `&query=${city}` +
    `&units=m`

  useEffect(() => {
		axios
			.get(api_url)
			.then(response => {
				setWeatherData(response.data)
			})
  }, [api_url])

  if (Object.keys(weatherData).length === 0 && weatherData.constructor === Object) {
    return <></>
  } else {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p><b>temperature:</b> {weatherData.current.temperature} Celsius</p>
        <img src={weatherData.current.weather_icons[0]} alt="Current weather" />
        <p><b>wind:</b> {weatherData.current.wind_speed} km/h direction {weatherData.current.wind_dir}</p>
      </div>
    )
  }
}

export default Weather