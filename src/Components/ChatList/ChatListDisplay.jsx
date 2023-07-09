import React, { useEffect, useState } from "react";
import { API_URLS } from "../Services/ApiUrls";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux/actionCreators";
import { getSender } from "../Config/getSender";
import { CreateGroupChatModal } from "./CreateGroupChatModal";
import chatPattern from "../../animations/chatpattern.png";

export const ChatListDisplay = () => {
  const dispatch = useDispatch();
  const { selectChat, updateMyChats } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const { user, selectedChat, myChats } = useSelector((state) => state);

  function selectNewChat(chat) {
    selectChat(chat);
  }

  async function fetchChats() {
    let res = await API_URLS.fetchChats();
    if (res.isSuccess) {
      updateMyChats(res.data);
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        backgroundImage: `url(${chatPattern})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        padding: "10px 20px",
        margin: "80px 10px 0 10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h6>My Chats</h6>
        <CreateGroupChatModal fetchChats={fetchChats} />
      </div>
      {myChats?.length > 0
        ? myChats.map((chat) => {
            return (
              <div
                key={chat._id}
                style={{
                  height: "60px",
                  backgroundColor:
                    selectedChat?._id !== chat._id ? "#E7E7E7" : "#38B2AC",
                  color: selectedChat?._id !== chat._id ? "black" : "white",
                  display: "flex",
                  marginTop: "10px",
                  paddingLeft: "8px",
                  alignItems: "center",
                  borderRadius: "5px",
                  cursor: "pointer",
                  gap: "10px",
                  border: "none",
                  width: "100%",
                }}
                onClick={() => selectNewChat(chat)}
              >
                {chat.isGroupChat ? chat.chatName : getSender(chat.users, user)}
              </div>
            );
          })
        : null}
      {/* {console.log(selectedChat)} */}
    </div>
  );
};
