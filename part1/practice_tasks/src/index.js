import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
	const [ counter, setCounter ] = useState(0)

	setTimeout(
		() => setCounter(counter + 1),
		1000
	)
  return (
    <div>{counter}</div>
	)
}
  
let counter = 1

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)