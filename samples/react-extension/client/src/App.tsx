import React from 'react';

export function App() {
  function sayHello() {
    alert('Hello, World!');
  }

  return <button onClick={sayHello}>Click me!</button>;
}
