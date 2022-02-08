import React from 'react';
import {TaskType} from "../TodoList";
import {Task} from "./Task/Task";

type TaskListPropsType = {
  tasks: Array<TaskType>
  removeTask: (taskID: number) => void
}

export const TaskList: React.FC<TaskListPropsType> = (props) => {

  const tackComponentList = props.tasks.map(task => {
    return <Task key={task.id}
                 {...task}
                 removeTask={props.removeTask}/>
  })

  return (
    <div>
      <ul>
        {tackComponentList}
      </ul>
    </div>
  );
};
