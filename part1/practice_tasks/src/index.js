import React from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
	const {counter} = props
  return (
    <div>{counter}</div>
	)
}
  
let counter = 1

ReactDOM.render(
    <React.StrictMode>
      <App counter={counter} />
    </React.StrictMode>,
    document.getElementById('root')
  );