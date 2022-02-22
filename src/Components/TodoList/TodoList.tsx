import React from "react";
import {TodoListHeader} from "./TodoListHeader/TodoListHeader";
import {TaskList} from "./TaskList/TaskList";
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskID: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean) => void
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
        <TodoListHeader
          title={props.title}
          filter={props.filter}
          addTask={props.addTask}
        />
        <TaskList
          tasks={props.tasks}
          removeTask={props.removeTask}
          changeTaskStatus={props.changeTaskStatus}
          changeFilter={props.changeFilter}
          filter={props.filter}
        />
      </div>
    </div>
  )
}