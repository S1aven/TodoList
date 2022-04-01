import {v1} from "uuid";
import {TasksStateType} from "../../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskAT = {
  type: 'REMOVE-TASK'
  todolistId: string
  taskId: string
}

export type AddTaskAT = {
  type: 'ADD-TASK'
  todolistId: string
  title: string
}

export type changeTaskStatusAT = {
  type: 'CHANGE-TASK-STATUS'
  todolistId: string
  taskId: string
  isDone: boolean
}

export type ChangeTaskTitleAT = {
  type: 'CHANGE-TASK-TITLE'
  todolistId: string
  taskId: string
  title: string
}

export type ActionType = RemoveTaskAT
  | AddTaskAT
  | changeTaskStatusAT
  | ChangeTaskTitleAT
  | AddTodolistActionType
  | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
  switch (action.type) {

    case 'REMOVE-TASK':
      const stateCopy = {...state}
      const tasks = state[action.todolistId]
      const filteredTasks = tasks.filter(t => t.id !== action.taskId)
      stateCopy[action.todolistId] = filteredTasks
      return stateCopy
    case 'ADD-TASK':
      return {
        ...state,
        [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
      }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
          ...task,
          isDone: action.isDone
        } : task)
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
          ...task,
          title: action.title
        } : task)
      }
    case 'ADD-TODOLIST': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = []
      return stateCopy
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    }

    default:
      return state
  }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => {
  return {
    type: 'REMOVE-TASK',
    todolistId,
    taskId
  }
}
export const addTaskAC = (todolistId: string, title: string): AddTaskAT => ({
  type: 'ADD-TASK',
  todolistId,
  title: title
})
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): changeTaskStatusAT => {
  return {
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    taskId,
    isDone
  }
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleAT => {
  return {
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    taskId,
    title: title
  }
}