const userLogIn = (userDetails) => {
  return (dispatch) => {
    dispatch({
      type: "userLogIn",
      payload: userDetails,
    });
  };
};

const selectChat = (chat) => {
  return (dispatch) => {
    dispatch({
      type: "selectChat",
      payload: chat,
    });
  };
};

const updateMyChats = (chats) => {
  return (dispatch) => {
    dispatch({
      type: "updateMyChats",
      payload: chats,
    });
  };
};

const updateChatFromMyChats = (chat) => {
  return (dispatch) => {
    dispatch({
      type: "updateChatFromMyChats",
      payload: chat,
    });
  };
};

const removeChatFromMyChats = (chat) => {
  return (dispatch) => {
    dispatch({
      type: "removeChatFromMyChats",
      payload: chat,
    });
  };
};

const addChatInMyChats = (chat) => {
  return (dispatch) => {
    dispatch({
      type: "addChatInMyChats",
      payload: chat,
    });
  };
};

const setChatMessages = (message) => {
  return (dispatch) => {
    dispatch({
      type: "setChatMessages",
      payload: message,
    });
  };
};

const updateNewMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: "updateNewMessage",
      payload: message,
    });
  };
};

const setNotification = (message) => {
  return (dispatch) => {
    dispatch({
      type: "setNotification",
      payload: message,
    });
  };
};

const removeNotification = (message) => {
  return (dispatch) => {
    dispatch({
      type: "removeNotification",
      payload: message,
    });
  };
};

export const actionCreators = {
  userLogIn,
  selectChat,
  updateMyChats,
  updateChatFromMyChats,
  removeChatFromMyChats,
  setChatMessages,
  updateNewMessage,
  addChatInMyChats,
  setNotification,
  removeNotification,
};
