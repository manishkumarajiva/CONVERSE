export const getRecipent = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[0] : users[1];
};


export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[0] : users[1];
};


export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  ) {
    return 33;
  } else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
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


export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};



