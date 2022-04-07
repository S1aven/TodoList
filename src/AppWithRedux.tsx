import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
  addTodolistAC,
  changeTodolistFilterAC, changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./state/reducer/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer
} from "./state/reducer/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
// C - create +!
// R - read +
// U - update
// D - delete +

export function AppWithRedux() {
  // BLL:
  const todolistId1 = v1();
  const todolistId2 = v1();

  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  const dispatch = useDispatch()

  // const [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
  //   {id: todolistId1, title: "What to learn", filter: "all"},
  //   {id: todolistId2, title: "What to buy", filter: "all"}
  // ])
  //
  // const [tasks, dispatchTasks] = useReducer(tasksReducer,{
  //   [todolistId1]: [
  //     {id: v1(), title: "HTML&CSS", isDone: true}, //3
  //     {id: v1(), title: "JS", isDone: true}
  //   ],
  //   [todolistId2]: [
  //     {id: v1(), title: "Milk", isDone: true},
  //     {id: v1(), title: "React Book", isDone: true}
  //   ]
  // });

  // Tasks
  function removeTask(id: string, todolistId: string) {
    // //достанем нужный массив по todolistId:
    // const todolistTasks = tasks[todolistId];
    // // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
    // tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
    // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    // setTasks({...tasks});
    let action = removeTaskAC(todolistId, id)
    dispatch(action)
  }
  function addTask(title: string, todolistId: string) {
    // const task = {id: v1(), title: title, isDone: false};
    // //достанем нужный массив по todolistId:
    // const todolistTasks = tasks[todolistId];
    // // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
    // tasks[todolistId] = [task, ...todolistTasks];
    // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    // setTasks({...tasks});
    dispatch(addTaskAC(todolistId, title))
  }
  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    // //достанем нужный массив по todolistId:
    // const todolistTasks = tasks[todolistId];
    // // найдём нужную таску:
    // const task = todolistTasks.find(t => t.id === id);
    // //изменим таску, если она нашлась
    // if (task) {
    //   task.isDone = isDone;
    //   // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    //   setTasks({...tasks});
    // }
    dispatch(changeTaskStatusAC(todolistId, id, isDone))
  }
  function changeTaskTitle(id: string, title: string, todolistId: string) {
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId]
    //     .map(t => t.id === id ? {...t, title: title} : t)
    // })
    dispatch(changeTaskTitleAC(todolistId, id, title))
  }

  // Todolist
  function changeFilter(value: FilterValuesType, todolistId: string) {
    // const todolist = todolists.find(tl => tl.id === todolistId);
    // if (todolist) {
    //   todolist.filter = value;
    //   setTodolists([...todolists])
    // }
    dispatch(changeTodolistFilterAC(todolistId, value))
  }
  function removeTodolist(id: string) {
    // // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
    // setTodolists(todolists.filter(tl => tl.id !== id));
    // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
    // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    // setTasks({...tasks});
    let action = removeTodolistAC(id)
    dispatch(action)
    // dispatchTasks(action)
  }
  function addNewTodolist(newTodolistTitle: string) {
    // const newTodolistId = v1()
    // setTodolists([...todolists,
    //   {id: newTodolistId, title: newTodolistTitle, filter: "all"}
    // ])
    // setTasks({...tasks, [newTodolistId]: []})
    let action = addTodolistAC(newTodolistTitle)
    dispatch(action)
    // dispatchTasks(action)
  }
  function changeTodolistTitle(title: string, todolistId: string) {
    // setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))
    dispatch(changeTodolistTitleAC(todolistId, title))
  }

  // UI:
  const todolistsComponents = todolists.map(tl => {
    const allTodolistTasks = tasks[tl.id];
    let tasksForTodolist = allTodolistTasks;

    if (tl.filter === "active") {
      tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (tl.filter === "completed") {
      tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    return (
      <Grid key={tl.id} item>
        <Paper style={{padding: '10px'}}>
          <Todolist
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        </Paper>
      </Grid>
    )
  })

  return (
    <div className="App">
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <Menu/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container style={{padding: '10px'}}>
          <AddItemForm addItem={addNewTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {todolistsComponents}
        </Grid>
      </Container>
    </div>
  );
}
