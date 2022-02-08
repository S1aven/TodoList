import React from 'react';

type TodoListHeaderPropsType = {
  title: string
}

export const TodoListHeader: React.FC<TodoListHeaderPropsType> = (props ) => {
  return (
    <div>
      <h3>{props.title}</h3>
    </div>
  );
};
