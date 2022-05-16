import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/reducer/todolists-reducer";
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
  console.log('AppWithRedux')

  // BLL:
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)


  // Todolist
  const changeFilter = useCallback ((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }, [dispatch])

  const removeTodolist = useCallback((id: string) => {
    const action = removeTodolistAC(id)
    dispatch(action)
  }, [dispatch])

  const addNewTodolist = useCallback ((newTodolistTitle: string) => {
    const action = addTodolistAC(newTodolistTitle)
    dispatch(action)
  }, [dispatch]);

  const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title))
  }, [dispatch])

  // UI:
  const todolistComponents = todolists.map(tl => {
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
          {todolistComponents}
        </Grid>
      </Container>
    </div>
  );
}
