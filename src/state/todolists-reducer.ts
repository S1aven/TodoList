import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTodolistActionType
  | AddTodolistActionType
  | changeTodolistTitleActionType
  | ChangeTodolistFilterActionType

type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
}
type changeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
  switch (action.type) {

    case 'REMOVE-TODOLIST':
      return state.filter(e => e.id !== action.id)
    case 'ADD-TODOLIST':
      return [
        ...state,
        {id: v1(), title: action.title, filter: 'all'}
      ]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

    default:
      return state
  }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: id}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title}
}
export const changeTodolistTitleAC= (id: string, title: string): changeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const ChangeTodolistFilterAC= (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
