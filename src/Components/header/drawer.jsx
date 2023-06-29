import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
