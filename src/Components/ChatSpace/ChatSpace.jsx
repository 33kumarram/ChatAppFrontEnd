import React from "react";
import { SingleChat } from "./SingleChat";

export const ChatSpace = () => {
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        backgroundColor: "white",
        height: "100vh",
        margin: "80px 10px 0 0px",
      }}
    >
      <SingleChat />
    </div>
  );
};
