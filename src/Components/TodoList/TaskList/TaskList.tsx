import React from 'react';
import {TaskType} from "../TodoList";
import {Task} from "./Task/Task";
import {ControlButton} from "./ControlButton/ControlButton";
import {FilterValuesType} from "../../../App";

type TaskListPropsType = {
  tasks: Array<TaskType>
  removeTask: (taskID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean) => void
  filter: FilterValuesType
  changeFilter: (filter: FilterValuesType) => void
}

export const TaskList: React.FC<TaskListPropsType> = (props) => {

  const tackComponentList = props.tasks.map(task => {
    return <Task key={task.id}
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
        changeFilter={props.changeFilter}
        filter={props.filter}
      />
    </>
  );
};
