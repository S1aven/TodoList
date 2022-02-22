import React from 'react';

type ButtonPropsType = {
  name: string
  classes?: string
  callBack: () => void
}

export const Button: React.FC<ButtonPropsType> = (props) => {

  const onClickHandler = () => {
    props.callBack()
  }

  return (
    <button className={props.classes} onClick={onClickHandler}>{props.name}</button>
  );
};
