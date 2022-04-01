import {FilterValuesType, TasksStateType, TodolistType} from "../../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./new-todolists-reducer";

export type RemoveTaskAT = {
  type: 'REMOVE-TASK'
  taskId: string
  todolistId: string
}

export type AddTaskAT = {
  type: 'ADD-TASK'
  todolistId: string
  title: string
}

export type ChangeStatusTaskAT = {
  type: 'CHANGE-STATUS-TASK'
  todolistId: string
  taskId: string
  isDone: boolean
}

export type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>
//   {
//   type: 'CHANGE-TASK-TITLE'
//   todolistId: string
//   taskId: string
//   title: string
// }

export type ActionType = RemoveTaskAT
  | AddTaskAT
  | ChangeStatusTaskAT
  | ChangeTaskTitleAT
  | AddTodolistAT
  | RemoveTodolistAT

export const newTasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
  switch (action.type) {

    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
      }
    case 'CHANGE-STATUS-TASK':
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
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.todolistId]: []
      }
    case 'REMOVE-TODOLIST': {
        let newState = {...state}
        delete newState[action.id]
        return newState
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
export const addTaskAC = (todolistId: string, title: string): AddTaskAT => {
  return {
    type: 'ADD-TASK',
    todolistId,
    title
  }
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeStatusTaskAT => {
  return {
    type: 'CHANGE-STATUS-TASK',
    todolistId,
    taskId,
    isDone
  }
}

export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    taskId,
    title
  } as const
}