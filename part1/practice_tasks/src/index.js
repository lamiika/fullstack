import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
	const [ counter, setCounter ] = useState(0)

	setTimeout(
		() => setCounter(counter + 1),
		1000
	)

	console.log('rendering...', counter)
	
  return (
    <div>{counter}</div>
	)
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)