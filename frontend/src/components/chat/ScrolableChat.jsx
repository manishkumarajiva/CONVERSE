import React from 'react';
import { ChatState } from '../../context/ChatProvider';
import ScrolableFeed from 'react-scrollable-feed';


const ScrolableChat = ({ messages }) => {
    const { user } = ChatState();

  return (
    <React.Fragment>
      <ScrolableFeed>
      {
        messages.map((message) => {
          return <p>{message.content}</p>
        })
      }
      </ScrolableFeed>
    </React.Fragment>
  )
}

export default ScrolableChat;
