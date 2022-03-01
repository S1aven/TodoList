import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../../../Button/Button";

type AddTaskFormPropsType = {
  id: string
  addTask: (title: string, todolistID: string) => void
}

export const AddTaskForm: React.FC<AddTaskFormPropsType> = (props) => {

  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const onChangeSetTitle= (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
    e.charCode === 13 && onClickAddTask()
    // if (e.charCode === 13) {
    //   props.addTask(title)
    //   setTitle('')
    // }
  }
  const onClickAddTask = () => {
    const trimmedTitle = title.trim()

    if(trimmedTitle) {
      props.addTask(trimmedTitle, props.id)
    } else {
      setError(true)
    }
    setTitle('')
  }

  // const errorMessage = error ? <div>title is require</div> : null
  const errorMessage = error && <div style={{backgroundColor: 'red', color: 'white', textAlign: "center"}}>Title is require</div>

  return (
    <div>
      <div>
        <input value={title}
               onChange={onChangeSetTitle}
               onKeyPress={onKeyPressSetTitle}
               className={error ? 'error' : ''}
        />
        <Button name={'+'} callBack={onClickAddTask}/>
        {errorMessage}
      </div>
    </div>
  );
};
