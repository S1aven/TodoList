import {TasksStateType, TodolistType} from "../../App";
import {newTasksReducer} from "./new-tasks-reducer";
import {newTodolistsReducer} from "./new-todolists-reducer";
import {AddTodolistAC} from "./new-todolists-reducer";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistType> = [];

  const action = AddTodolistAC("new todolist");

  const endTasksState = newTasksReducer(startTasksState, action)
  const endTodolistsState = newTodolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
  expect(idFromTodolists).toBe(idFromTasks);
});
