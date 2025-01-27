export const getRecipent = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};


export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[0] : users[1];
};


export const isSameSender = (messages, currentMessage, indexOfMessage, userId) => {
  return (
    indexOfMessage < messages.length - 1 &&
    (messages[indexOfMessage + 1].sender._id !== currentMessage.sender._id ||
      messages[indexOfMessage + 1].sender._id === undefined) &&
    messages[indexOfMessage].sender._id !== userId
  );
};


export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1]
  );
};



export const isSameSenderMargin = (messages, currentMessage, indexOfMessage, userId) => {
  if (
    indexOfMessage < messages.length - 1 &&
    messages[indexOfMessage + 1].sender._id === currentMessage.sender._id &&
    messages[indexOfMessage].sender._id !== userId
  ) {
    return 0;
  } else if (
    (indexOfMessage < messages.length - 1 &&
      messages[indexOfMessage + 1].sender._id !== currentMessage.sender._id &&
      messages[indexOfMessage].sender._id !== userId) ||
    (indexOfMessage === messages.length - 1 && messages[indexOfMessage].sender._id !== userId)
  ) {
    return 0;
  } else {
    return 80;
  }
};


export const isSameUser = (messages, currentMessage, indexOfMessage) => {
  return (indexOfMessage > 0) && messages[indexOfMessage - 1].sender._id === currentMessage.sender._id;
};



