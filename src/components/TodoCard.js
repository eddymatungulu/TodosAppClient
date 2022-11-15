import React, { useContext } from 'react';
import {Grid} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from './CompleteButton';
import DeleteButton from './DeleteButton';


function TodoCard({
  todo: { body, createdAt, id, username, complete }
}) {
  const { user } = useContext(AuthContext);

  return (
    <Grid>
    <Grid.Row columns={3}>
      <Grid.Column width={1}>
        <LikeButton user={user} post={{ id, complete,}} />  
      </Grid.Column>
      <Grid.Column floated='left' width={9}>
        <div>{body}</div>
      </Grid.Column>
      <Grid.Column floated='right' width={2}>
        <div>
        {user && <DeleteButton postId={id} />}
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  
  );
}

export default TodoCard;
