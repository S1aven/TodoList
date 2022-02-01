import React from 'react';

type TodoListHeaderPropsType = {
  title: string
}

const TodoListHeader = (props: TodoListHeaderPropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
    </div>
  );
};

export default TodoListHeader;