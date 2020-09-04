import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
	const[clicks, setClicks] = useState({
		left: 0, right: 0
	})

	const handleLeftClick = () => {
		setClicks({ ...clicks, left: clicks.left + 1 })
	}

	const handleRightClick = () => {
		setClicks({ ...clicks, right: clicks.right + 1 })
	}

	return (
		<>
			<div>
				{clicks.left}
				<button onClick={handleLeftClick}>left</button>
				<button onClick={handleRightClick}>right</button>
				{clicks.right}
			</div>
		</>
	)
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)