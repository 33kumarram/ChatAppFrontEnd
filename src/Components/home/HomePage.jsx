import React from "react";
import { Grid } from "@mui/material";
import { ChatListDisplay } from "../ChatList/ChatListDisplay";
import { ChatSpace } from "../ChatSpace/ChatSpace";


export const HomePage = () => {
  return (
    <div>
      <Grid container disableEqualOverflow>
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
