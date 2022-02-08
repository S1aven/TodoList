import React from 'react';
import {FilterValuesType} from "../../../App";

type controlButtonPropsType = {
  changeFilter: (filter: FilterValuesType) => void
}

export const ControlButton: React.FC<controlButtonPropsType> = (props) => {
  return (
    <div>
      <div>
        <button onClick={() => props.changeFilter("all")}>All</button>
        <button onClick={() => props.changeFilter("active")}>Active</button>
        <button onClick={() => props.changeFilter("completed")}>Completed</button>
      </div>
    </div>
  );
};