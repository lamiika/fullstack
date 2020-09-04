import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
	const [value, setValue] = useState(10)
	
	const handleClick = () => {
		console.log('clicked the button')
		setValue(0)
	}

  return (
    <div>
      {value}
			<button onClick={handleClick}>reset to zero</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)