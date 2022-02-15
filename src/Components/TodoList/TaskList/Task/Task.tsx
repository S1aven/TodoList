import React from 'react';
import {TaskType} from "../../TodoList";

type TaskPropsType = TaskType & {
  removeTask: (taskID: string) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
  
  const onRemoveHandler = () => {
    props.removeTask(props.id)
  }
  
  return (
    <>
      <li>
        <input type="checkbox" checked={props.isDone}/>
        <span>{props.title}</span>
        <button onClick={onRemoveHandler}>delete</button>
      </li>
    </>
  );
};