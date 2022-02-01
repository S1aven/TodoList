import React from 'react';
import {TaskType} from "../TodoList";
import Task from "./Task/Task";

type TaskListPropsType = {
  tasks: Array<TaskType>
}

const TaskList = (props: TaskListPropsType) => {
  return (
    <div>
      <ul>
        <Task {...props.tasks[0]}/>
        <Task {...props.tasks[1]}/>
        <Task {...props.tasks[2]}/>
        {/*<li><input type="checkbox" checked={props.isDone}/> <span>{props.title}</span></li>*/}
        {/*<li><input type="checkbox" checked={props.isDone}/> <span>{props.title}</span></li>*/}
        {/*<li><input type="checkbox" checked={props.isDone}/> <span>{props.title}</span></li>*/}
      </ul>
    </div>
  );
};

export default TaskList;