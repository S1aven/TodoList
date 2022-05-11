import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
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

export function AppWithReduxNew() {
  // BLL:

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)


  // Todolist
  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }
  function removeTodolist(id: string) {
    const action = removeTodolistAC(id)
    dispatch(action)
  }
  function addNewTodolist(newTodolistTitle: string) {
    const action = addTodolistAC(newTodolistTitle)
    dispatch(action)

  }
  function changeTodolistTitle(title: string, todolistId: string) {
    dispatch(changeTodolistTitleAC(todolistId, title))
  }

  // UI:
  const todolistsComponents = todolists.map(tl => {
    // const allTodolistTasks = tasks[tl.id];
    // let tasksForTodolist = allTodolistTasks;
    //
    // if (tl.filter === "active") {
    //   tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    // }
    // if (tl.filter === "completed") {
    //   tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    // }

    return (
      <Grid key={tl.id} item>
        <Paper style={{padding: '10px'}}>
          <Todolist
            id={tl.id}
            title={tl.title}
            changeFilter={changeFilter}
            filter={tl.filter}
            removeTodolist={removeTodolist}
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
