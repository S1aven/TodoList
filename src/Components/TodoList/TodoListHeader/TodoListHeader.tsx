import React from 'react';
import {FilterValuesType} from "../../../App";
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";

type TodoListHeaderPropsType = {
  todolistID: string
  filter: FilterValuesType
  title: string
  addTask: (todolistID: string, title: string) => void
  removeTodolist: (todolistID: string) => void
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

  const removeTodolist = () => {
    props.removeTodolist(props.todolistID)
  }

  return (
    <div>
      <h3>
        {props.title}
        <div className={'filter-header'}>{text}</div>
        <button onClick={removeTodolist}>x</button>
      </h3>
      <AddTaskForm
        todolistID={props.todolistID}
        addTask={props.addTask}
      />
    </div>
  );
};
