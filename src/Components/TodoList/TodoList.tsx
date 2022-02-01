import React from "react";
import TodoListHeader from "./TodoListHeader/TodoListHeader";
import TaskList from "./TaskList/TaskList";
import ControlButton from "./ControlButton/ControlButton";
import AddTaskForm from "./AddTaskForm/AddTaskForm";

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
}

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
  return (
    <div>
      <div>
        <TodoListHeader title={props.title}/>
        {/*<h3>{props.title}</h3>*/}
        <AddTaskForm/>
        {/*<div>*/}
        {/*  <input/>*/}
        {/*  <button>+</button>*/}
        {/*</div>*/}
        <TaskList tasks={props.tasks}/>
        {/*<ul>*/}
        {/*  <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
        {/*  <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
        {/*  <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
        {/*</ul>*/}
        <ControlButton/>
        {/*<div>*/}
        {/*  <button>All</button>*/}
        {/*  <button>Active</button>*/}
        {/*  <button>Completed</button>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default TodoList;