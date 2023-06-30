import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux/actionCreators";
import { getSenderDetails } from "../Config/getSender";
import { ProfileModal } from "../header/ProfileModal";
import { EditGroupDetailsModal } from "./EditGropDetailsModal";
import { API_URLS } from "../Services/ApiUrls";
import { CircularProgress } from "@mui/material";
import { ScrollableChat } from "./ScrollableChat";
import { io } from "socket.io-client";

var socket, selectedChatCompare;
const ENDPOINT = process.env.REACT_APP_API_URL;

export const SingleChat = () => {
  const dispatch = useDispatch();
  const { selectChat, setChatMessages, updateNewMessage, setNotification } =
    bindActionCreators(actionCreators, dispatch);
  const { selectedChat, user, notifications } = useSelector((state) => state);
  const [pendingMessage, setPendingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && pendingMessage !== "") {
      e.preventDefault();
      socket.emit("stop typing", selectedChat._id);
      const { isSuccess, data } = await API_URLS.sendMessage({
        content: pendingMessage,
        chatId: selectedChat._id,
      });

      if (isSuccess) {
        setPendingMessage("");
        updateNewMessage(data);
        socket.emit("new message", data);
      }
    }
  };

  const handleChange = (e) => {
    clearTimeout();
    setPendingMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    setTimeout(() => {
      if (new Date().getTime() - lastTypingTime >= 3000 && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, 3000);
  };

  const fetchAllMessages = async () => {
    setIsLoading(true);
    const { isSuccess, data } = await API_URLS.fetchAllMessages(
      selectedChat._id
    );
    if (isSuccess) {
      setChatMessages(data);
      socket.emit("join chat", selectedChat._id);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChat || !(selectedChat._id == newMessageReceived.chat._id)) {
        // show notification
        setNotification(newMessageReceived);
      } else if (selectedChat._id === newMessageReceived.chat._id) {
        updateNewMessage(newMessageReceived);
      }
    });
  });

  return (
    <div style={{ height: "100%" }}>
      {selectedChat && selectedChat._id ? (
        <div
          style={{
            backgroundColor: "#E7E7E7",
            borderRadius: "10px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 10px",
              gap: "20px",
            }}
          >
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => selectChat({})}
            >
              <ArrowBackIcon fontSize="small" />
            </button>
            {selectedChat.isGroupChat ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>{selectedChat.chatName}</span>
                <EditGroupDetailsModal chat={selectedChat} />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>{getSenderDetails(selectedChat.users, user).name}</span>
                <ProfileModal
                  user={getSenderDetails(selectedChat.users, user)}
                />
              </div>
            )}
          </div>
          <div
            style={{
              maxWidth: "100%",
              height: "90%",
              margin: "0px 10px",
              marginBottom: "10px",
              borderRadius: "8px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  flexDirection: "column",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <ScrollableChat />
              </div>
            )}
            <form
              style={{
                marginTop: "auto",
                maxWidth: "100%",
                height: "20px",
                margin: "10px 10px 15px 10px",
              }}
            >
              <input
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid black",
                }}
                name="pendingMessage"
                placeholder="  Enter a message"
                onChange={handleChange}
                onKeyDown={sendMessage}
                value={pendingMessage}
                type="text"
              />
            </form>
            {isTyping && <div>{console.log(isTyping, typing)}</div>}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "90Vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Click on a user to start chatting
        </div>
      )}
    </div>
  );
};
