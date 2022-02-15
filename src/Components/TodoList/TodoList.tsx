import React from "react";
import {TodoListHeader} from "./TodoListHeader/TodoListHeader";
import {TaskList} from "./TaskList/TaskList";
import {ControlButton} from "./ControlButton/ControlButton";
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (title: string) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
  return (
    <div>
      <div>
        <TodoListHeader title={props.title}/>
        <AddTaskForm addTask={props.addTask}/>
        <TaskList
          tasks={props.tasks}
          removeTask={props.removeTask}
        />
        <ControlButton changeFilter={props.changeFilter}/>
      </div>
    </div>
  )
}