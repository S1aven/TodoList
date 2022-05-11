import React, {useReducer, useState} from 'react';
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

export function AppWithReducersNew() {
  // BLL:
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ])

  const [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true}, //3
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  });

  // Tasks
  function removeTask(id: string, todolistId: string) {
    dispatchTasksReducer(removeTaskAC(todolistId, id))
  }
  function addTask(title: string, todolistId: string) {
    dispatchTasksReducer(addTaskAC(todolistId, title))
  }
  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatchTasksReducer(changeTaskStatusAC(todolistId, id, isDone))
  }
  function changeTaskTitle(id: string, title: string, todolistId: string) {
    dispatchTasksReducer(changeTaskTitleAC(todolistId, id, title))
  }

  // Todolist
  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchTodolistsReducer(changeTodolistFilterAC(todolistId, value))
  }
  function removeTodolist(id: string) {
    const action = removeTodolistAC(id)
    dispatchTodolistsReducer(action)
    dispatchTasksReducer(action)
  }
  function addNewTodolist(newTodolistTitle: string) {
    const action = addTodolistAC(newTodolistTitle)
    dispatchTodolistsReducer(action)
    dispatchTasksReducer(action)
  }
  function changeTodolistTitle(title: string, todolistId: string) {
    dispatchTodolistsReducer(changeTodolistTitleAC(todolistId, title))
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
