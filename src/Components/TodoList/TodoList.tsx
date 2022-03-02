import React from "react";
import {TodoListHeader} from "./TodoListHeader/TodoListHeader";
import {TaskList} from "./TaskList/TaskList";
import {FilterValuesType, TaskType} from "../../App";

type TodoListPropsType = {
  todolistID: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (todolistID: string, taskID: string) => void
  changeFilter: (todolistID: string, filter: FilterValuesType) => void
  addTask: (todolistID: string, title: string) => void
  changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
  removeTodolist: (todolistID: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
  return (
    <div>
      <div>
        <TodoListHeader
          removeTodolist={props.removeTodolist}
          todolistID={props.todolistID}
          title={props.title}
          filter={props.filter}
          addTask={props.addTask}
        />
        <TaskList
          todolistID={props.todolistID}
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