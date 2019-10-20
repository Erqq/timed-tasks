import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import AddTaskModal from './add-task-modal'
import Task from './task'

const TaskContainer = styled.div`
  display: flex;
  justifyContent: start;
  width: 960px;
`

class Task_list extends Component {
  state = {
    showModal: false,
    taskList: [],
    title: "",
    description: ""
  }

  onClick = () => {
    this.setState({ showModal: true })

  }

  onClose = () => {
    this.setState({ showModal: false })
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { title, description, taskList } = this.state
    this.setState({ taskList: [...taskList, { title: title, description: description }] },
      () => console.log(this.state))

    this.onClose()
  }

  tasks = () => {
    const { taskList } = this.state

    return taskList.map(task => {
      return Task(task.title, task.description)
    })
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value })
  }

  render() {
    const showModal = this.state.showModal
    return (
      <div>  <TaskContainer name="container">
        <Button onClick={this.onClick} variant="contained" color="secondary" >
          add task
      </Button >
        <AddTaskModal
          onSubmit={this.onSubmit}
          showModal={showModal}
          onClose={this.onClose}
          handleChange={this.handleChange}>

        </AddTaskModal>

      </TaskContainer>
        {this.tasks()}
      </div>


    )

  }
}

export default Task_list;
