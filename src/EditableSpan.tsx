import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = React.memo((props) => {

  console.log('EditableSpan')

  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState(props.title)

  const onEditMode = () => setEditMode(true)

  const offEditMode = useCallback(() => {
    setEditMode(false)
    props.changeTitle(title)
  }, [props.changeTitle, title])

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }, [])

  return (
    editMode
      ? <TextField
        variant={"standard"}
        value={title}
        onChange={onChangeHandler}
        onBlur={offEditMode}
        autoFocus
      />
      : <span onDoubleClick={onEditMode}>{props.title}</span>
  );
});