import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Components/TodoList/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

const App = () => {

  // const [tasks, setTasks] = useState<Array<TaskType>>([
  //   {id: v1(), title: 'HTML', isDone: true},
  //   {id: v1(), title: 'CSS', isDone: false},
  //   {id: v1(), title: 'JS/TS', isDone: true}
  // ])

  // RemoveTask

  const removeTask = (todolistID: string, taskID: string ) => {
    setTasks({...tasksObj, [todolistID]:tasksObj[todolistID].filter(el => el.id !== taskID)})
    // const tasks = tasksObj[todolistID]
    // const filteredTasks = tasks.filter(task => task.id !== taskID)
    // tasksObj[todolistID] = filteredTasks
    // setTasks({...tasksObj})
  }

  //     Filter


  const changeFilter = ( todolistID: string, filter: FilterValuesType) => {
    setTodolists(todoLists.map(el => el.id === todolistID ? {...el, filter: filter} : el))
    // const todolist = todoLists.find(e => e.id === todolistID)
    // if (todolist) {
    //   todolist.filter = filter
    //   setTodolists([...todoLists])
    // }
  }

  //       AddTask

  function addTask(todolistID: string, title: string) {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false
    }
    setTasks({...tasksObj, [todolistID]:[newTask, ...tasksObj[todolistID]]})
    // const tasks = tasksObj[todolistID]
    // const newTasks = [task, ...tasks]
    // tasksObj[todolistID] = newTasks
    // setTasks({...tasksObj})
  }

  //   CheckBox

  const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
   setTasks({...tasksObj, [todolistID]:tasksObj[todolistID].map(el => el.id === taskID ? {...el, isDone} : el)})
    // const tasks = tasksObj[todolistID]
    // const task = tasks.find(e => e.id === taskID)
    // if(task) {
    //   task.isDone = isDone
    //   setTasks({...tasksObj})
    // }
    // setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
  }

  //    Remove Todolist

  const removeTodolist = (todolistID: string) => {
    setTodolists(todoLists.filter(el => el.id !== todolistID))
    // const filteredTodolist = todoLists.filter(t => t.id !== todolistID)
    // setTodolists(filteredTodolist)

    delete tasksObj[todolistID]
    setTasks({...tasksObj})
  }

  //    Map TodoList

  const todolistID1 = v1()
  const todolistID2 = v1()

  const [todoLists, setTodolists] = useState<TodoListType[]>([
      {id: todolistID1, title: "What to learn", filter: "all"},
      {id: todolistID2, title: "What to buy", filter: "all"},
    ]
  )

  const [tasksObj, setTasks] = useState({
    [todolistID1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: false},
      {id: v1(), title: 'JS/TS', isDone: true}
    ],
    [todolistID2]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: false},
      {id: v1(), title: 'JS/TS', isDone: true}
    ]
  })

  return (
    <div className="App">

      {
        todoLists.map((e) => {

          let tasksForTodolist = tasksObj[e.id]

          if(e.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
          }
          if (e.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
          }

          return (
            <TodoList
              key={e.id}
              todolistID={e.id}
              title={e.title}
              tasks={tasksForTodolist}
              // tasks={filteredTasksForRender}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              removeTodolist={removeTodolist}
              filter={e.filter}
            />
          )
        })
      }

      {/*<TodoList*/}
      {/*  title={'What to learn'}*/}
      {/*  tasks={filteredTasksForRender}*/}
      {/*  removeTask={removeTask}*/}
      {/*  changeFilter={changeFilter}*/}
      {/*  addTask={addTask}*/}
      {/*  changeTaskStatus={changeTaskStatus}*/}
      {/*  filter={filter}*/}
      {/*/>*/}
    </div>
  );
}

export default App;