import React, { Component } from 'react';
import { styled, Button } from '@material-ui/core/';
import TaskModal from './task-modal'
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

  /**
   * Opens the modal where you can add or edit the task 
   */
  onClick = (event) => {
    this.setState({
      showModal: true,
      type: event.currentTarget.name,
      taskId: event.currentTarget.id
    })
  }

  /**
   * Closes the modal
   */
  onClose = () => {
    this.setState({ showModal: false })
  }

  /**
   * Adds the task to a list on submit
   */
  onSubmit = (values) => {
    const { taskList } = this.state
    const { title, description, } = values
    let { startTime, stopTime } = values

    startTime = moment(startTime)
    stopTime = moment(stopTime)

    this.setState({ taskList: [...taskList, { title, description, startTime, stopTime }] })
    this.onClose()
  }

  /**
   * Edits the tasks data on submit 
   */
  onEdit = (values) => {
    const { taskId } = this.state

    this.setState(prevState => {
      let taskList = prevState.taskList
      return taskList[taskId] = values
    })

    this.onClose()
  }

  /**
   * Deletes the task on button click
   */
  onDelete = (event) => {
    const { taskList } = this.state
    taskList.splice(event.currentTarget.id, 1)
    this.setState({ taskList })
  }

  /**
   * Gets the duration of all the tasks. Duration goes pretty high if the task is set to multiple days
   * because this does not count the fact that you dont work 24/7.
   */
  getDuration = () => {
    const { taskList } = this.state
    let duration = 0

    taskList.map(task => {
      duration = duration +
        moment.duration(moment(task.stopTime).diff(task.startTime)).asMilliseconds()
      return task
    })

    duration = moment.duration(duration, "ms")
    return `${duration.get("days")} days, ${duration.get("hours")} hours, ${duration.get("minutes")} minutes`
  }

  /**
   * Goes through the tasklist and maps tasks to components. Should not use the index as task id 
   * but at the moment they don't have other unique identifier so lets go with the easy way.
   */
  tasks = () => {
    const { taskList } = this.state
    return taskList.map((task, index) => {
      return Task(task, this.onClick, this.onDelete, index)
    })
  }

  /**
   * Returns add task modal or edit task modal
   */
  modalType = () => {
    const { showModal, type, taskList, taskId } = this.state

    if (type === "addTask") {
      return <TaskModal
        type={type}
        onSubmit={this.onSubmit}
        showModal={showModal}
        onClose={this.onClose}
      />
    }
    if (type === "editTask") {
      return <TaskModal
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
          <div>
            <Button
              name="addTask"
              onClick={this.onClick}
              variant="contained"
              color="secondary" >
              add task
            </Button >
          </div>
          <p>duration {this.getDuration()}</p>
          {this.modalType()}
        </TaskContainer>
        {this.tasks()}
      </div>
    )
  }
}

export default TaskList;
