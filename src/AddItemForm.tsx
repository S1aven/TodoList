import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";

type AddItemFormPropsType = {
  addItem: (newTitle: string) => void
}

const AddItemForm: FC<AddItemFormPropsType> = (props) => {

  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const addItem = () => {
    const newTitle = title.trim();
    if (newTitle !== "") {
      props.addItem(newTitle);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addItem();
    }
  }
  return (
    <div>
      <TextField
        variant={"standard"}
        value={title}
        label={"Type value"}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addItem}>
        <AddTask fontSize={'small'} color={'secondary'}/>
      </IconButton>
    </div>
  );
};

export default AddItemForm;