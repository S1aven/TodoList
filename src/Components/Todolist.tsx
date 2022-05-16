import React, {useCallback} from 'react';
import {FilterValuesType} from '../AppWithRedux';
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";
import {Button, IconButton, List} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC} from "../state/reducer/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks?: Array<TaskType>
  removeTask?: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask?: (title: string, todolistId: string) => void
  changeTaskStatus?: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  filter: FilterValuesType
  changeTaskTitle?: (id: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
  console.log('Todolist')

  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])
  const dispatch = useDispatch();

  // ------- У Димыча данные тудулиста получили в App -------
  // const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
  // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  //
  // const dispatch = useDispatch()
  //
  // // Tasks
  // function removeTask(id: string, todolistId: string) {
  //   let action = removeTaskAC(todolistId, id);
  //   dispatch(action)
  // }
  //
  // function addTask(title: string, todolistId: string) {
  //   let action = addTaskAC(todolistId, title)
  //   dispatch(action)
  // }
  //
  // function changeStatus(id: string, isDone: boolean, todolistId: string) {
  //   let action = changeTaskStatusAC(todolistId, id, isDone)
  //   dispatch(action)
  // }
  //
  // function changeTaskTitle(id: string, title: string, todolistId: string) {
  //   let action = changeTaskTitleAC(todolistId, id, title)
  //   dispatch(action)
  // }

  // const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists.filter(todo => todo.id === props.id)[0])
  // const task = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])

  const removeTodolist = useCallback(() => props.removeTodolist(props.id), [props.removeTodolist, props.id]);
  const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.id), [props.changeTodolistTitle, props.id]);
  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(props.id, title))
  }, [dispatch, props.id])
  const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

  const allTodolistTasks = tasks;
  let tasksForTodolist = allTodolistTasks;

  if (props.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
  }
  if (props.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
  }

  return <div>
    <h3 style={{textAlign: "center"}}>
      <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist} size={'small'} aria-label="delete">
        <Delete fontSize={'small'}/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <List>
      {
        tasksForTodolist.map(t => {
          return <Task key={t.id} isDone={t.isDone} taskId={t.id} todolistId={props.id} title={t.title}/>
          // const onClickHandler = () => dispatch(removeTaskAC(props.id, t.id))
          // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
          //   let newIsDoneValue = e.currentTarget.checked;
          //   dispatch(changeTaskStatusAC(props.id, t.id, newIsDoneValue))
          // }
          // const changeTaskTitle = (title: string) => dispatch(changeTaskTitleAC(props.id, t.id, title))
          // return <li key={t.id} className={t.isDone ? "is-done" : ""}>
          //   <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
          //   <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
          //   <IconButton onClick={onClickHandler} aria-label="delete">
          //     <Delete fontSize="small"/>
          //   </IconButton>
          // </li>
        })
      }
    </List>
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <Button variant={props.filter === 'all' ? "contained" : "text"}
              onClick={onAllClickHandler}
              color={"secondary"}
      >All
      </Button>
      <Button variant={props.filter === 'active' ? "contained" : "text"}
              onClick={onActiveClickHandler}
              color={"success"}
      >Active
      </Button>
      <Button variant={props.filter === 'completed' ? "contained" : "text"}
              onClick={onCompletedClickHandler}
              color={"primary"}
      >Completed
      </Button>
    </div>
  </div>
})


