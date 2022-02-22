import React, {ChangeEvent} from 'react';
import {TaskType} from "../../TodoList";
import {Button} from "../../../Button/Button";

type TaskPropsType = TaskType & {
  removeTask: (taskID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
  
  const onRemoveHandler = () => {
    props.removeTask(props.id)
  }

  const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.id, e.currentTarget.checked)
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