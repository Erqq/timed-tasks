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
    type: "",
    taskId: null

  }

  onClick = (event) => {

    this.setState({
      showModal: true,
      type: event.currentTarget.name,
      taskId: event.currentTarget.id
    })

  }


  onClose = () => {
    this.setState({ showModal: false })
  }

  onSubmit = (values) => {
    const { taskList } = this.state
    const { title, description, } = values
    let { startTime, stopTime } = values
    startTime = moment(startTime)
    stopTime = moment(stopTime)

    this.setState({ taskList: [...taskList, { title, description, startTime, stopTime }] })

    this.onClose()

  }

  onEdit = (values) => {
    const { taskId } = this.state

    this.setState(prevState => {
      let taskList = prevState.taskList
      return taskList[taskId] = values

    })

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
      return Task(task.title, task.description, this.onClick, index, task.startTime, task.stopTime)
    })
  }


  modalType = () => {
    const { showModal, type, taskList, taskId } = this.state

    if (type === "addTask") {
      return <AddTaskModal
        type={type}
        onSubmit={this.onSubmit}
        showModal={showModal}
        onClose={this.onClose}
      />
    }
    if (type === "editTask") {
      return <AddTaskModal
        values={taskList[taskId]}
        type={type}
        onSubmit={this.onEdit}
        showModal={showModal}
        onClose={this.onClose}
      />
    }

  }

  render() {
    return (
      <div>
        <TaskContainer name="container">
          <div> <Button name="addTask" onClick={this.onClick} variant="contained" color="secondary" >
            add task
          </Button ></div>

          <p>duration {this.getDuration().toFixed(2)}h </p>

          {this.modalType()}

        </TaskContainer>
        {this.tasks()}
      </div>


    )

  }
}

export default TaskList;
