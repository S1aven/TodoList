import {FilterValuesType, TodolistType} from "../../AppWithRedux";
import {v1} from "uuid";

type ActionsType = RemoveTodolistActionType
  | AddTodolistActionType
  | changeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export const todolistId1 = v1();
export const todolistId2 = v1();

const initState: TodolistType[] = [
  {id: todolistId1, title: "What to learn", filter: "all"},
  {id: todolistId2, title: "What to buy", filter: "all"}
]

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
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

export const todolistsReducer = (state = initState, action: ActionsType): Array<TodolistType> => {
  switch (action.type) {

    case 'REMOVE-TODOLIST':
      return state.filter(e => e.id !== action.id)
    case 'ADD-TODOLIST':
      return [
        {id: action.todolistId, title: action.title, filter: 'all'},
        ...state,
      ]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

    default:
      return state
  }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: id}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC= (id: string, title: string): changeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC= (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
