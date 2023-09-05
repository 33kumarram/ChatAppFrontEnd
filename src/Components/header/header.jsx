import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux/actionCreators";
import DrawerComp from "./drawer";
import { ProfileModal } from "./ProfileModal";
import LogoutIcon from "@mui/icons-material/Logout";
import { NotificationDialog } from "./notificationDialog";
import chatPattern from "../../animations/chatpattern.png";
import { Hidden } from "@mui/material";

export const Header = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userLogIn } = bindActionCreators(actionCreators, dispatch);
  const LogOut = () => {
    userLogIn({});
  };
  const user = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background: "#fff",
          backgroundImage: `url(${chatPattern})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Toolbar>
          <>
            <DrawerComp />
            <NotificationDialog />
            {/* <Typography
                sx={{ fontSize: "26px", paddingLeft: "10px", color: "#000" }}
              >
                Articles
              </Typography> */}
          </>
          <>
            <Tabs
              sx={{ marginLeft: "auto" }}
              indicatorColor="secondary"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Hidden smDown>
                <Tab
                  label="Home"
                  onClick={() => navigate("/home")}
                  style={{ color: "#000" }}
                />
                <Tab
                  label="About Us"
                  onClick={() => navigate("/about")}
                  style={{ color: "#000" }}
                />
                <Tab
                  label="Contact Us"
                  onClick={() => navigate("/contact")}
                  style={{ color: "#000" }}
                />
              </Hidden>
            </Tabs>
            <Button sx={{ marginLeft: "auto" }}>
              <ProfileModal user={user} />
            </Button>
            <button
              style={{ border: "none", background: "none", padding: "2px" }}
              onClick={LogOut}
              color="error"
            >
              <LogoutIcon fontSize="small" />
            </button>
          </>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
