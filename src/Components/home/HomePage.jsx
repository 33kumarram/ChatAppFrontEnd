import React from "react";
import { Grid } from "@mui/material";
import { ChatListDisplay } from "../ChatList/ChatListDisplay";
import { ChatSpace } from "../ChatSpace/ChatSpace";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const selectedChat = useSelector((state) => state.selectedChat);
  return (
    <div>
      <Grid container>
        <Grid item lg={3} sm={4} xs={12}>
          <ChatListDisplay />
        </Grid>
        <Grid item lg={9} sm={8} xs={12}>
          <ChatSpace />
        </Grid>
      </Grid>
    </div>
  );
};
