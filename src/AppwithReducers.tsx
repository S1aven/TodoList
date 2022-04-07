import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
  addTodolistAC,
  changeTodolistFilterAC, changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/reducer/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/reducer/tasks-reducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";

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

function AppWithReducers() {
  // BLL:
  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  const dispatch = useDispatch()

  // Tasks
  function removeTask(id: string, todolistId: string) {
    let action = removeTaskAC(todolistId, id);
    dispatch(action)
  }

  function addTask(title: string, todolistId: string) {
    let action = addTaskAC(todolistId, title)
    dispatch(action)
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let action = changeTaskStatusAC(todolistId, id, isDone)
    dispatch(action)
  }

  function changeTaskTitle(id: string, title: string, todolistId: string) {
    let action = changeTaskTitleAC(todolistId, id, title)
    dispatch(action)
  }

  // Todolist
  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }

  function removeTodolist(id: string) {
    let action = removeTodolistAC(id)
    dispatch(action)
  }

  function addNewTodolist(newTodolistTitle: string) {
    let action = addTodolistAC(newTodolistTitle)
    dispatch(action)
  }

  function changeTodolistTitle(title: string, todolistId: string) {
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

export default AppWithReducers;
