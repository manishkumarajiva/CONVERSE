import React from 'react';
import { ChatState } from '../../context/ChatProvider';

const ScrolableChat = ({ message }) => {
    const { user } = ChatState();

  return (
    <React.Fragment>
      <p> Scrolable Chat </p>
    </React.Fragment>
  )
}

export default ScrolableChat;
