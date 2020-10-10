import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
    <div>
      <div>
        3
      </div>
      <div>
        <button>plus</button>
        <button>minus</button>
        <button>zero</button>
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)