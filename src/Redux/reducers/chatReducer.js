const updateChat = (chats, updatedChat) => {
  chats = chats.filter((chat) => {
    return chat._id !== updatedChat._id;
  });
  let newChats = [updatedChat, ...chats];
  return newChats;
};

const addChat = (chats, newChat) => {
  let chatExists = chats.filter((chat) => {
    return chat._id === newChat._id;
  });
  if (chatExists.length > 0) return chats;
  return [newChat, ...chats];
};

const removeChat = (chats, updatedChat) => {
  chats = chats.filter((chat) => {
    return chat._id !== updatedChat._id;
  });
  return chats;
};

export const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case "selectChat":
      return action.payload;
    default:
      return state;
  }
};

export const myChatReducer = (state = [], action) => {
  switch (action.type) {
    case "updateMyChats":
      return action.payload;
    case "updateChatFromMyChats":
      let updated = updateChat(state, action.payload);
      return updated;
    case "addChatInMyChats":
      let updtd = addChat(state, action.payload);
      return updtd;
    case "removeChatFromMyChats":
      let filtered = removeChat(state, action.payload);
      return filtered;
    default:
      return state;
  }
};
