import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";
import { chatReducer, myChatReducer } from "./reducers/chatReducer";
import { messageReducer } from "./reducers/messageReducer";
import { notificationReducer } from "./reducers/notificationReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  selectedChat: chatReducer,
  myChats: myChatReducer,
  chatMessages: messageReducer,
  notifications: notificationReducer,
});
