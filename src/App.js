import React, { Component } from 'react';
import './App.css';
import Task from './components/task'
import Task_list from './components/tasks-container';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container">
          <header className="App-header">

            <Task_list />
          </header>
        </div>

      </div>
    )
  }
}

export default App;
