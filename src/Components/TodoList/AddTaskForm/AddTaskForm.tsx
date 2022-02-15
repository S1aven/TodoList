import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddTaskFormPropsType = {
  addTask: (title: string) => void
}

export const AddTaskForm: React.FC<AddTaskFormPropsType> = (props) => {

  const [title, setTitle] = useState('')

  const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(title)
      setTitle('')
    }
  }

  const addTask = () => {
    props.addTask(title)
    setTitle('')
  }

  return (
    <div>
      <div>
        <input value={title}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
    </div>
  );
};
