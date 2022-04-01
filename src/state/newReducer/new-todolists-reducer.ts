import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
  type: 'REMOVE-TODOLIST'
  id: string
}

export type AddTodolistAT = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}

export type ChangeTodolistFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}

export type ChangeTodolistTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}

export type ActionType = RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistFilterAT
  | ChangeTodolistTitleAT

export const newTodolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
  switch (action.type) {

    case 'REMOVE-TODOLIST':
      return todolists.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [
        ...todolists,
        {id: action.todolistId, title: action.title, filter: "all"}
      ]
    case 'CHANGE-TODOLIST-FILTER':
      return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case "CHANGE-TODOLIST-TITLE":
      return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

    default:
      return todolists
  }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => {
  return {
    type: 'REMOVE-TODOLIST',
    id: id
  }
}
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: 'ADD-TODOLIST', title: title, todolistId: v1()})
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
  }
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
  }
}