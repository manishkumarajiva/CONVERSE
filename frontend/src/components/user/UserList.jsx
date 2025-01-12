import React from 'react';
import { ListGroup } from 'react-bootstrap';
import UserListItems from './UserListItems';


const UserList = ({users}) => {
  return <React.Fragment>
    <ListGroup as={'ul'} className='py-3'>
      {
        users && users.map((user, index) => {
          return <UserListItems index={index} user={user}></UserListItems>
        })
      }
    </ListGroup>
  </React.Fragment>
}

export default UserList