import React from 'react';
import {FilterValuesType} from "../../../../App";
import {Button} from "../../../Button/Button";

type controlButtonPropsType = {
  todolistID: string
  filter: FilterValuesType
  changeFilter: (filter: FilterValuesType, todolistID: string) => void
}

export const ControlButton: React.FC<controlButtonPropsType> = (props) => {

  const onClickSetFilter = (filter: FilterValuesType, todolistID: string) => {
    return () => props.changeFilter(filter, todolistID)
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
          callBack={onClickSetFilter('all', props.todolistID)}
        />
        <Button
          classes={props.filter === 'active' ?  'button-active' : ''}
          name={'Active'} callBack={onClickSetFilter('active', props.todolistID)}
        />
        <Button
          classes={props.filter === 'completed' ?  'button-active' : ''}
          name={'Completed'} callBack={onClickSetFilter('completed', props.todolistID)}
        />
      </div>
    </div>
  );
};