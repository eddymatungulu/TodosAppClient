import React from 'react';
import { Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_TODOS_QUERY } from '../util/graphql';

function TodoForm() {
  const { values, onChange, onSubmit } = useForm(createTodoCallback, {
    body: ''
  });

  const [createTodo, { error }] = useMutation(CREATE_TODO_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_TODOS_QUERY
      });
      data.getTodos = [result.data.createTodo, ...data.getTodos];
      proxy.writeQuery({ query: FETCH_TODOS_QUERY, data });
      values.body = '';
    }
  });

  function createTodoCallback() {
    createTodo();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Input
            placeholder="Add a new todo"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
         
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_TODO_MUTATION = gql`
  mutation createTodo($body: String!) {
    createTodo(body: $body) {
      id
      body
      createdAt
      username
      complete {
        id
        username
        createdAt
      }
    }
  }
`;

export default TodoForm;
