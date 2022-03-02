import React, {ChangeEvent} from 'react';
import {TaskType} from "../../../../App";
import {Button} from "../../../Button/Button";

type TaskPropsType = TaskType & {
  todolistID: string
  removeTask: (taskID: string, todolistID: string) => void
  changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
  
  const onRemoveHandler = () => {
    props.removeTask(props.todolistID, props.id )
  }

  const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todolistID, props.id, e.currentTarget.checked)
  }

  // const taskClass = props.isDone ? 'completed-task' : ''

  // let taskClass = 'task '
  // if(props.isDone) {
  //   taskClass += 'completed-task'
  // }

  // let taskClass = props.isDone && 'completed-task'
  let taskClass = `task ${props.isDone ? 'task-completed' : ''}`

  // const classes = ['task']
  // if (props.isDone) {
  //   classes.push('task-completed')
  // }

  // console.log(taskClass)
  
  return (
    <>
      <li>
        <input type="checkbox"
               checked={props.isDone}
               onChange={changeTaskStatus}
        />
        <span className={taskClass}>{props.title}</span>
        <Button name={'delete'} callBack={onRemoveHandler}/>
      </li>
    </>
  );
};