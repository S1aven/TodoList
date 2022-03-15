import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState(props.title)
  const onEditMode = () => setEditMode(true)
  const offEditMode = () => {
    setEditMode(false)
    props.changeTitle(title)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
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
};

export default EditableSpan;