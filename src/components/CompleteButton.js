import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


import MyPopup from '../util/MyPopup';

function CompleteButton({ user, todo: { id, complete } }) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (user && complete.find((_complete) => _complete.username === user.username)) {
      setCompleted(true);
    } else setCompleted(false);
  }, [user, complete]);

  const [completeTodo] = useMutation(COMPLETE_TODO_MUTATION, {
    variables: { todoId: id }
  });

  const completeButton = user ? (
    completed ? (
      <input checked="true" type='checkbox'/>
  
    ) : (
      <input  type='checkbox'/>
    )
  ) : (
    <div/>

  );

  return (
    <div as="div" className="Rectangle-Check" onClick={completeTodo}>
      <MyPopup content={completed ? 'UnComplete' : 'Complete'}>{completeButton}</MyPopup>
    </div>
  );
}

const COMPLETE_TODO_MUTATION= gql`
  mutation completeTodo($todoId: ID!) {
    completeTodo(todoId: $todoId) {
      id
      complete {
        id
        username
      }
    }
  }
`;

export default CompleteButton;
