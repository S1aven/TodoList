import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/reducer/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";

type TaskPropsType = {
  isDone: boolean
  taskId: string
  todolistId: string
  title: string
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  console.log('Task')

  const dispatch = useDispatch();

  const removeTask = useCallback(() => dispatch(removeTaskAC(props.todolistId, props.taskId)), [dispatch, props.taskId, props.todolistId]);
  const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    dispatch(changeTaskStatusAC(props.todolistId, props.taskId, newIsDoneValue))
  }, [dispatch, props.todolistId, props.taskId]);
  const changeTaskTitle = useCallback((title: string) => dispatch(changeTaskTitleAC(props.todolistId, props.taskId, title)), [dispatch, props.taskId, props.todolistId]);

  return <li key={props.taskId} className={props.isDone ? "is-done" : ""}>
    <Checkbox onChange={changeTaskStatus} checked={props.isDone}/>
    <EditableSpan title={props.title} changeTitle={changeTaskTitle}/>
    <IconButton onClick={removeTask} aria-label="delete">
      <Delete fontSize="small"/>
    </IconButton>
  </li>
})