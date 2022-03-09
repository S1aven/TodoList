import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  updateTask: (todolistId: string, taskId: string, title: string) => void
  updateTodolist: (todolistId: string, title: string) => void
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {
  // let [title, setTitle] = useState("")
  // let [error, setError] = useState<string | null>(null)
  //
  // const addTask = () => {
  //     let newTitle = title.trim();
  //     if (newTitle !== "") {
  //         props.addTask(newTitle, props.id);
  //         setTitle("");
  //     } else {
  //         setError("Title is required");
  //     }
  // }
  //
  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //     setTitle(e.currentTarget.value)
  // }
  //
  // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  //     setError(null);
  //     if (e.charCode === 13) {
  //         addTask();
  //     }
  // }

  const removeTodolist = () => props.removeTodolist(props.todolistId)

  const onAllClickHandler = () => props.changeFilter("all", props.todolistId);
  const onActiveClickHandler = () => props.changeFilter("active", props.todolistId);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistId);
  const addTaskHandler = (title: string) => {
    props.addTask(title, props.todolistId)
  }
  const updateTaskHandler = (taskId: string, title: string) => {
    props.updateTask(props.todolistId, taskId, title)
  }

  const updateTodolistHandler = (title: string) => {
    props.updateTodolist(props.todolistId, title)
  }

  return <div>
    <h3>
      <EditableSpan callback={updateTodolistHandler} title={props.title}/>
      {/*{props.title}*/}
      <button onClick={removeTodolist}>x</button>
    </h3>
    <AddItemForm callback={addTaskHandler}/>
    {/*<div>*/}
    {/*    <input value={title}*/}
    {/*           onChange={onChangeHandler}*/}
    {/*           onKeyPress={onKeyPressHandler}*/}
    {/*           className={error ? "error" : ""}*/}
    {/*    />*/}
    {/*    <button onClick={addTask}>+</button>*/}
    {/*    {error && <div className="error-message">{error}</div>}*/}
    {/*</div>*/}
    <ul>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.todolistId)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.todolistId);
          }

          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
            <EditableSpan callback={(title) => updateTaskHandler(t.id, title)} title={t.title}/>
            {/*<span>{t.title}</span>*/}
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button className={props.filter === 'all' ? "active-filter" : ""}
              onClick={onAllClickHandler}>All
      </button>
      <button className={props.filter === 'active' ? "active-filter" : ""}
              onClick={onActiveClickHandler}>Active
      </button>
      <button className={props.filter === 'completed' ? "active-filter" : ""}
              onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>
}


