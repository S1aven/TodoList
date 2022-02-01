import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./Components/TodoList/TodoList";

function App() {

  const tasks_1: Array<TaskType> = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: false},
    {id: 3, title: 'JS/TS', isDone: false}
  ]

  const tasks_2: Array<TaskType> = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: false},
    {id: 3, title: 'JS/TS', isDone: true}
  ]

  const tasks_3: Array<TaskType> = [
    {id: 1, title: 'HTML', isDone: false},
    {id: 2, title: 'CSS', isDone: true},
    {id: 3, title: 'JS/TS', isDone: true}
  ]

  return (
    <div className="App">
      <TodoList title={'What to learn'} tasks={tasks_1}/>
      <TodoList title={'What to read'} tasks={tasks_2}/>
      <TodoList title={'What to duy'} tasks={tasks_3}/>
    </div>
  );
}

export default App;