import React from 'react';
import {TaskType} from "../../TodoList";

type TaskPropsType = TaskType & {
  removeTask: (taskID: number) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
  return (
    <>
      <li>
        <input type="checkbox" checked={props.isDone}/>
        <span>{props.title}</span>
        <button onClick={ () => {props.removeTask(props.id)} }>delete</button>
      </li>
    </>
  );
};