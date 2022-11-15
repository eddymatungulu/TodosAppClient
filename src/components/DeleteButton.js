import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Confirm, Icon } from 'semantic-ui-react';

import { FETCH_TODOS_QUERY } from '../util/graphql';
import MyPopup from '../util/MyPopup';

function DeleteButton({ todoId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = DELETE_TODO_MUTATION;

  const [deleteTodoOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      
      const data = proxy.readQuery({
          query: FETCH_TODOS_QUERY
        });
        data.getTodos = data.getTodos.filter((p) => p.id !== todoId);
        proxy.writeQuery({ query: FETCH_TODOS_QUERY, data });
      
      if (callback) callback();
    },
    variables: {
      todoId
    }
  });
  return (
    <>
      <MyPopup content='Delete post'>
        <div
          as="div"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="x icon" style={{ margin: 0 }} />
        </div>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteTodoOrMutation}
      />
    </>
  );
}

const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId)
  }
`;

export default DeleteButton;
