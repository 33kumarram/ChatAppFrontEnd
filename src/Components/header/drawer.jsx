import React, { useState } from "react";
import {
  Drawer,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchUser } from "./SearchUser";

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        style={{ color: "#000", width: "200px" }}
        onClose={() => setOpenDrawer(false)}
      >
        <SearchUser setOpenDrawer={setOpenDrawer} />
      </Drawer>
      <IconButton
        sx={{ color: "#000" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <SearchIcon color="#000" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
