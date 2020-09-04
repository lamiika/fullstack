import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const History = ({ allClicks }) => {
	if (allClicks.length === 0) {
		return (
			<div>
				the app is used by pressing the buttons
			</div>
		)
	}

	return (
		<div>
			button press history: {allClicks.join(' ')}
		</div>
	)
}

const Button = (props) => {
	console.log('props value is', props)
	const { handleClick, text } = props
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
	const [allClicks, setAll] = useState([])
	
  const handleLeftClick = () => {
		setAll(allClicks.concat('L'))
		setLeft(left + 1)
	}

  const handleRightClick = () => {
		setAll(allClicks.concat('R'))
		setRight(right + 1)
	}
	
  return (
    <>
      <div>
        {left}
        <Button handleClick={handleLeftClick} text='left' />
        <Button handleClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
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