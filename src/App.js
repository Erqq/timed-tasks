import React, { Component } from 'react';
import './App.css';
import TaskList from './components/tasks-container';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { createStore } from 'redux'
import taskApp from './reducers'
import { Provider } from 'react-redux'

const store = createStore(taskApp)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="container">
            <header className="App-header">
              <MuiPickersUtilsProvider utils={MomentUtils}>

                <TaskList />
              </MuiPickersUtilsProvider >

            </header>
          </div>

        </div>
      </Provider>
    )
  }
}

export default App;
