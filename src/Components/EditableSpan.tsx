import React, {ChangeEvent, useState} from 'react';

type PropsType = {
  title: string
  callback: (title: string) => void

}

export const EditableSpan: React.FC<PropsType> = (props) => {

  const [title, setTitle] = useState(props.title)
  const [edit, setEdit] = useState(false)

  const onDoubleClickHandler = () => {
    setEdit(true)
  }

  const onBlurHandler = () => {
    props.callback(title)
    setEdit(false)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.currentTarget.value
    setTitle(newTitle)
  }

  return (
      edit
        ? <input onChange={onChangeHandler} autoFocus={true} onBlur={onBlurHandler} value={title}/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
  );
};