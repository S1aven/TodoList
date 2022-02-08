import React, {useState} from 'react';
import './App.css';
import {TodoList, TaskType} from "./Components/TodoList/TodoList";

export type FilterValuesType = "all" | "active" | "completed";

const App = () => {

  //     RemoveTask

  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: false},
    {id: 3, title: 'JS/TS', isDone: true}
  ])

  const removeTask = (taskID: number) => {
    const filteredTasks = tasks.filter(task => task.id !== taskID)
    setTasks(filteredTasks)
  }

  //     Filter

  const [filter, setFilter] = useState<FilterValuesType>("all")

  const getFilteredTasksForRender = () => {
    switch (filter) {
      case "completed":
        return tasks.filter(t => t.isDone === true)
      case "active":
        return tasks.filter(t => t.isDone === false)
      default:
        return tasks
    }
  }

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  const filteredTasksForRender = getFilteredTasksForRender()

  return (
    <div className="App">
      <TodoList
        title={'What to learn'}
        tasks={filteredTasksForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
      {/*<TodoList title={'What to read'} tasks={tasks_2}/>*/}
      {/*<TodoList title={'What to duy'} tasks={tasks_3}/>*/}
    </div>
  );
}

export default App;