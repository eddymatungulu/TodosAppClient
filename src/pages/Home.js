import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import TodoCard from '../components/TodoCard';
import TodoForm from '../components/TodoForm';
import { FETCH_TODOS_QUERY } from '../util/graphql';
import logo from '../assets/group.svg';

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getTodos: todos }
  } = useQuery(FETCH_TODOS_QUERY);

  return (

    <div className="Centered">
      <div className="Rectangle">
      <div>
          <img src={logo} alt="logo"/>
        </div>

        <h1>Todo List</h1>
        
        <Grid columns={1}>
      <Grid.Row className="page-title">
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <TodoForm />
            <br/>
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading Todos..</h1>
        ) : (
          <Grid.Column style={{overflow: 'auto', maxHeight: 270 }}>
            <Transition.Group>
              {todos &&
                todos.map((todo) => (
                  <Grid.Column key={todo.id} style={{ marginBottom: 20 }}>
                    <TodoCard todo={todo} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          </Grid.Column>
        )}
      </Grid.Row>
    
    </Grid>



      </div>
    </div>
    
  );
}

export default Home;
