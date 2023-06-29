import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessageOfSender } from "../Config/ScrollableChatLogic";
import { ProfileModal } from "../header/ProfileModal";

export const ScrollableChat = () => {
  const { chatMessages, user } = useSelector((state) => state);

  return (
    <ScrollableFeed>
      {chatMessages &&
        chatMessages.length > 0 &&
        chatMessages.map((message, i) => {
          return (
            <div
              style={{
                display: "flex",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                gap: "10px",
                alignItems:
                  message.sender._id === user._id ? "flex-end" : "flex-start",
              }}
              key={message._id}
            >
              <div style={{ display: "flex", maxWidth: "50%" }}>
                {isLastMessageOfSender(chatMessages, i) &&
                message.sender._id !== user._id ? (
                  <ProfileModal user={message.sender} />
                ) : (
                  <div style={{ width: "42px" }}></div>
                )}
                <div
                  style={{
                    backgroundColor:
                      message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                    borderRadius:
                      message.sender._id === user._id
                        ? "0 10px 10px 10px"
                        : "10px 0px 10px 10px",
                    padding: "2px 10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {message.content}
                </div>
              </div>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};
