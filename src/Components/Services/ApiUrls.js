import {
  axiosInstances,
  axiosMultipartInstances,
} from "../Helpers/axiosWrapper";

const baseURL = process.env.REACT_APP_API_URL;
//sample request
//need call service : {url:'/', method:'post', data:'params'}
function userSignUp(params) {
  return axiosInstances({
    url: `${baseURL}/users/signup`,
    method: "post",
    data: params,
  });
}

function userLogIn(params) {
  return axiosInstances({
    url: `${baseURL}/users/login`,
    method: "post",
    data: params,
  });
}

function uploadProfilePic(params) {
  return axiosMultipartInstances({
    url: `${baseURL}/files/uploadimage`,
    method: "post",
    data: params,
  });
}

function fetchChats() {
  return axiosInstances({ url: `${baseURL}/chats/`, method: "get" });
}

function searchUsers(username) {
  return axiosInstances({
    url: `${baseURL}/users/search/${username}`,
    method: "get",
  });
}

function accessChat(userId) {
  return axiosInstances({
    url: `${baseURL}/chats/accesschat`,
    method: "post",
    data: { userId: userId },
  });
}

function createGroupChat(params) {
  return axiosInstances({
    url: `${baseURL}/chats/group`,
    method: "post",
    data: params,
  });
}

function renameGroup(params) {
  return axiosInstances({
    url: `${baseURL}/chats/rename`,
    method: "put",
    data: params,
  });
}

function addToGroup(params) {
  return axiosInstances({
    url: `${baseURL}/chats/addtogroup`,
    method: "put",
    data: params,
  });
}

function removeFromGroup(params) {
  return axiosInstances({
    url: `${baseURL}/chats/removefromgroup`,
    method: "put",
    data: params,
  });
}

function sendMessage(params) {
  return axiosInstances({
    url: `${baseURL}/messages/send`,
    method: "post",
    data: params,
  });
}

function fetchAllMessages(chatId) {
  return axiosInstances({
    url: `${baseURL}/messages/${chatId}`,
    method: "get",
  });
}

export const API_URLS = {
  userSignUp,
  userLogIn,
  uploadProfilePic,
  fetchChats,
  searchUsers,
  accessChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  sendMessage,
  fetchAllMessages,
};
