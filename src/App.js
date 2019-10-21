import React, { Component } from 'react';
import './App.css';
import TaskList from './components/tasks-container';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container">
          <header className="App-header">
            <MuiPickersUtilsProvider utils={MomentUtils}>

              <TaskList />
            </MuiPickersUtilsProvider >

          </header>
        </div>

      </div>
    )
  }
}

export default App;
