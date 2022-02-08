import React from "react";
import {TodoListHeader} from "./TodoListHeader/TodoListHeader";
import {TaskList} from "./TaskList/TaskList";
import {ControlButton} from "./ControlButton/ControlButton";
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: number) => void
  changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
  return (
    <div>
      <div>
        <TodoListHeader title={props.title}/>
        <AddTaskForm/>
        <TaskList
          tasks={props.tasks}
          removeTask={props.removeTask}
        />
        <ControlButton changeFilter={props.changeFilter}/>
      </div>
    </div>
  )
}