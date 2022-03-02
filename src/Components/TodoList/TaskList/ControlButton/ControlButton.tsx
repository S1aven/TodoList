import React from 'react';
import {FilterValuesType} from "../../../../App";
import {Button} from "../../../Button/Button";

type controlButtonPropsType = {
  todolistID: string
  filter: FilterValuesType
  changeFilter: (todolistID: string, filter: FilterValuesType) => void
}

export const ControlButton: React.FC<controlButtonPropsType> = (props) => {

  const onClickSetFilter = (todolistID: string, filter: FilterValuesType) => {
    return () => props.changeFilter(todolistID, filter)
  }

  // const onAllClickHandler = () => {
  //   props.changeFilter("all")
  // }
  // const onActiveClickHandler = () => {
  //   props.changeFilter("active")
  // }
  // const onCompletedClickHandler = () => {
  //   props.changeFilter("completed")
  // }

  return (
    <div>
      <div>
        <Button
          classes={props.filter === 'all' ?  'button-active' : ''}
          name={'All'}
          callBack={onClickSetFilter(props.todolistID,'all')}
        />
        <Button
          classes={props.filter === 'active' ?  'button-active' : ''}
          name={'Active'} callBack={onClickSetFilter(props.todolistID,'active')}
        />
        <Button
          classes={props.filter === 'completed' ?  'button-active' : ''}
          name={'Completed'} callBack={onClickSetFilter(props.todolistID,'completed')}
        />
      </div>
    </div>
  );
};