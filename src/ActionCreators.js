import { ADD_TASKLIST } from './actions'

export function addTasklist(taskList) {
    return { type: ADD_TASKLIST, taskList }
}