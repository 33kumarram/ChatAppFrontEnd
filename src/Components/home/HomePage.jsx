import React from "react";
import { Grid, Hidden } from "@mui/material";
import { ChatListDisplay } from "../ChatList/ChatListDisplay";
import { ChatSpace } from "../ChatSpace/ChatSpace";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const selectedChat = useSelector(state => state.selectedChat)
  return (
    <div>
      <Grid container disableEqualOverflow>
        <Grid item lg={3} sm={4} xs={12}>
          {selectedChat && selectedChat._id ?
            <Hidden smDown>
              <ChatListDisplay />
            </Hidden>
            :
            <ChatListDisplay />
          }
        </Grid>
        <Grid item lg={9} sm={8} xs={12}>
          <ChatSpace />
        </Grid>
      </Grid>
      {
        console.log(selectedChat == {}, selectedChat)
      }
    </div>
  );
};
