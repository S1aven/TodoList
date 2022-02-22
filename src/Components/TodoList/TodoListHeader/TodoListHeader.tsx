import React from 'react';
import {FilterValuesType} from "../../../App";
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";

type TodoListHeaderPropsType = {
  filter: FilterValuesType
  title: string
  addTask: (title: string) => void
}

export const TodoListHeader: React.FC<TodoListHeaderPropsType> = (props ) => {

  let text = 'all'
  switch (props.filter) {
    case 'active':
      text = 'act'
      break
    case  'completed':
      text = 'comp'
      break
  }

  return (
    <div>
      <h3>
        {props.title}
        <div className={'filter-header'}>{text}</div>
      </h3>
      <AddTaskForm addTask={props.addTask}/>
    </div>
  );
};
