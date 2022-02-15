import React from 'react';
import {FilterValuesType} from "../../../App";

type controlButtonPropsType = {
  changeFilter: (filter: FilterValuesType) => void
}

export const ControlButton: React.FC<controlButtonPropsType> = (props) => {
  
  const onAllClickHandler = () => {
    props.changeFilter("all")
  }
   const onActiveClickHandler = () => {
    props.changeFilter("active")
  }
   const onCompletedClickHandler = () => {
    props.changeFilter("completed")
  }

  return (
    <div>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
};