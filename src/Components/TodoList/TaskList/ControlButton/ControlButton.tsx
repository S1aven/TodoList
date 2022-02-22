import React from 'react';
import {FilterValuesType} from "../../../../App";
import {Button} from "../../../Button/Button";

type controlButtonPropsType = {
  filter: FilterValuesType
  changeFilter: (filter: FilterValuesType) => void
}

export const ControlButton: React.FC<controlButtonPropsType> = (props) => {

  const onClickSetFilter = (filter: FilterValuesType) => {
    return () => props.changeFilter(filter)
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
        <Button classes={props.filter === 'all' ?  'button-active' : ''} name={'All'} callBack={onClickSetFilter('all')}/>
        <Button classes={props.filter === 'active' ?  'button-active' : ''} name={'Active'} callBack={onClickSetFilter('active')}/>
        <Button classes={props.filter === 'completed' ?  'button-active' : ''} name={'Completed'} callBack={onClickSetFilter('completed')}/>
      </div>
    </div>
  );
};