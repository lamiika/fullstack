import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
	const [countries, setCountries] = useState([])
	const [searchInput, setSearchInput] = useState('')

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response =>{
				setCountries(response.data)
			})
	}, [])

	const filterCountries = countries.filter(country => 
		country.name.toLowerCase().includes(searchInput.toLowerCase()))

	return (
		<div>
			<Filter searchInput={searchInput} setSearchInput={setSearchInput} />
			<Countries filterCountries={filterCountries} />
		</div>
	)
}

export default App