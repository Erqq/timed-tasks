import { combineReducers } from 'redux'
import { ADD_TASKLIST } from './actions'

const taskList = (state = [], action) => {
    switch (action.type) {
        case ADD_TASKLIST:
            return [...state, action]
        default:
            return state
    }
}

const taskApp = combineReducers({
    taskList
})

export default taskApp