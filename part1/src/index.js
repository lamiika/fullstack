import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old. It is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+10} />
      <Hello name={nimi} age={ika} />
      <Hello name="Iina" age="10" />
      <Footer />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);