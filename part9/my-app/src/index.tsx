import React from 'react';
import ReactDOM from 'react-dom';

interface WelcomeProps {
  name: string;
}

const Welcome: React.FC<{ name: string }> = ({ name }) => (
  <h1>Hello, {name}</h1>
);

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));