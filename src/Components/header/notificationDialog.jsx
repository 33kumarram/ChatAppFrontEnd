import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Button, ListItem, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux/actionCreators";
import { List } from "@mui/icons-material";
import "./notification.css";

export const NotificationDialog = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const notifications = useSelector((state) => state.notifications);
  const { removeNotification, selectChat } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleClick = (message) => {
    selectChat(message.chat);
    removeNotification(message);
    handleClose();
  };

  const style = {
    position: "relative",
    top: "60px",
    left: "30px",
    // transform: "translate(-50%, -50%)",
    width: "300px",
    maxHeight: "600px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    overFlow: "scroll",
  };

  return (
    <div>
      {
        <Button onClick={handleOpen}>
          <div
            className="bell-notification"
            current-count={notifications.length}
          >
            {/* <i className="fa-solid fa-bell"></i> */}
            <NotificationsIcon style={{ color: "black" }} />
          </div>
        </Button>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => {
              return (
                <div
                  key={notification._id}
                  style={{
                    backgroundColor: "#E5E5E5",
                    padding: "4px 8px",
                    borderRadius: "5px",
                    marginBottom: "5px",
                  }}
                  onClick={() => handleClick(notification)}
                >
                  {notification.chat.isGroupChat
                    ? `New Message in ${notification?.chat?.chatName}`
                    : `New Message from ${notification?.sender?.name}`}
                </div>
              );
            })
          ) : (
            <div>No new Message</div>
          )}
        </Box>
      </Modal>
    </div>
  );
};
