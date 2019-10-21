import React, { Component } from 'react';
import { styled, Button } from '@material-ui/core/';
import AddTaskModal from './add-task-modal'
import Task from './task'
import moment from 'moment'

const TaskContainer = styled('div')({
  display: "flex",
  justifyContent: "start",
  width: 960
})



class TaskList extends Component {
  state = {
    showModal: false,
    taskList: [],


  }

  onClick = () => {
    this.setState({ showModal: true })

  }


  onClose = () => {
    this.setState({ showModal: false })
  }

  onSubmit = (values) => {
    const { taskList } = this.state
    const { title, description, startTime, stopTime } = values

    this.setState({ taskList: [...taskList, { title, description, startTime, stopTime }] })

    this.onClose()

  }

  onDelete = (event) => {
    const { taskList } = this.state
    taskList.splice(event.currentTarget.id, 1)
    this.setState({ taskList })


  }

  getDuration = () => {
    const { taskList } = this.state
    let duration = 0
    taskList.map(task => {
      duration = duration +
        Number(moment.duration(moment(task.stopTime).diff(task.startTime)).asHours())
      return task
    })

    return duration

  }

  tasks = () => {
    const { taskList } = this.state
    return taskList.map((task, index) => {
      return Task(task.title, task.description, this.onDelete, index, task.startTime, task.stopTime)
    })
  }



  render() {
    const { showModal } = this.state
    return (
      <div>
        <TaskContainer name="container">
          <div> <Button onClick={this.onClick} variant="contained" color="secondary" >
            add task
          </Button ></div>

          <p>duration {this.getDuration().toFixed(2)}h </p>
          <AddTaskModal
            onSubmit={this.onSubmit}
            showModal={showModal}
            onClose={this.onClose}
          />


        </TaskContainer>
        {this.tasks()}
      </div>


    )

  }
}

export default TaskList;
