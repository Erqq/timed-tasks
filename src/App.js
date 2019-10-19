import React from 'react';
import './App.css';
import Task from './components/task'

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">

          {Task("moimoi", "heihei")}
        </header></div>

    </div>
  );
}

export default App;
