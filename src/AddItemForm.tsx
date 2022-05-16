import React, {ChangeEvent, FC, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddTask} from "@mui/icons-material";

type AddItemFormPropsType = {
  addItem: (newTitle: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo((props) => {
  console.log('AddItemForm')

  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }, []);

  const addItem = useCallback(() => {
    const newTitle = title.trim();
    if (newTitle !== "") {
      props.addItem(newTitle);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }, [props.addItem, title]);

  const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }

    if (e.key === "Enter") {
      addItem();
    }
  }, [error ,addItem]);

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
});