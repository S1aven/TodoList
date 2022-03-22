import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  filter: FilterValuesType
  changeTaskTitle: (id: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {

  const removeTodolist = () => props.removeTodolist(props.id);
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
  const addTaskToTodolist = (newTitle: string) => props.addTask(newTitle, props.id);
  const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id);

  return <div>
    <h3  style={{textAlign: "center"}}>
      <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
      {/*<button onClick={removeTodolist}>x</button>*/}
      <IconButton onClick={removeTodolist} size={'small'} aria-label="delete">
        <Delete fontSize={'small'}/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTaskToTodolist}/>
    <List>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          }
          const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
            <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
            {/*<span>{t.title}</span>*/}
            {/*<button onClick={onClickHandler}>x</button>*/}
            <IconButton onClick={onClickHandler} aria-label="delete">
              <Delete fontSize="small"/>
            </IconButton>
          </li>
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
}


