import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const App = (props) => {
	const [ counter, setCounter ] = useState(0)

	const increaseByOne = () => setCounter(counter + 1)
	const decreaseByOne = () => setCounter(counter - 1)
	const setToZero = () => setCounter(0)

  return (
		<>
			<Display counter={counter} />
			<Button
				handleClick={increaseByOne}
				text='plus'
			/>
			<Button
				handleClick={setToZero}
				text='zero'
			/>
			<Button
				handleClick={decreaseByOne}
				text='minus'
			/>
		</>
	)
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)