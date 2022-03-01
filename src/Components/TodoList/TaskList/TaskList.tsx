import React from 'react';
import {TaskType} from "../../../App";
import {Task} from "./Task/Task";
import {ControlButton} from "./ControlButton/ControlButton";
import {FilterValuesType} from "../../../App";

type TaskListPropsType = {
  todolistID: string
  tasks: Array<TaskType>
  removeTask: (taskID: string, todolistID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
  filter: FilterValuesType
  changeFilter: (filter: FilterValuesType, todolistID: string) => void
}

export const TaskList: React.FC<TaskListPropsType> = (props) => {

  const tackComponentList = props.tasks.map(task => {
    return <Task key={task.id}
                 todolistID={props.todolistID}
                 {...task}
                 removeTask={props.removeTask}
                 changeTaskStatus={props.changeTaskStatus}
    />
  })
  const emptyMessage = <div style={{fontSize: '10px'}}>
    Task list with this filter is empty. Please, add task or change filter!
  </div>

  const taskList = tackComponentList.length
    ?
    <ul>
      {tackComponentList}
    </ul>
    : emptyMessage

  return (
    <>
      {taskList}

      <ControlButton
        todolistID={props.todolistID}
        changeFilter={props.changeFilter}
        filter={props.filter}
      />
    </>
  );
};
