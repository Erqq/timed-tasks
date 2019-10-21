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
    title: "",
    description: "",
    startTime: new Date(),
    stopTime: new Date(),
  }

  onClick = () => {
    this.setState({ showModal: true })

  }


  onClose = () => {
    this.setState({ showModal: false })
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { title, description, taskList, startTime, stopTime } = this.state

    this.setState({ taskList: [...taskList, { title, description, startTime, stopTime }] })

    this.onClose()

  }

  onDelete = (event) => {
    event.preventDefault();
    const { taskList } = this.state

    taskList.splice(event.currentTarget.id, 1)
    this.setState({ taskList })


  }
  onStartChange = (time) => {
    const { stopTime } = this.state
    this.setState({ startTime: time })
    stopTime < time ? this.setState({ stopTime: time }) : this.setState({ stopTime })

  }

  onStopChange = (time) => {
    const { startTime } = this.state

    time < startTime ? this.setState({ stopTime: startTime }) : this.setState({ stopTime: time })

  }

  handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value })
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
    const { showModal, startTime, stopTime } = this.state
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
            handleChange={this.handleChange}
            startTime={startTime}
            stopTime={stopTime}
            onStopChange={this.onStopChange}
            onStartChange={this.onStartChange} />


        </TaskContainer>
        {this.tasks()}
      </div>


    )

  }
}

export default TaskList;
