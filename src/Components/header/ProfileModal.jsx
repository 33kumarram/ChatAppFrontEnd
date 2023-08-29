import { Box, Modal } from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "180px",
  left: "80%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: 24,
  p: 2,
};

export const ProfileModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        style={{ border: "none", padding: "4px 6px", background: "none" }}
        onClick={handleOpen}
      >
        <img
          src={user.profile_pic}
          alt="user"
          style={{
            width: "30px",
            height: "30px",
            objectFit: "cover",
            borderRadius: "30px",
            border: "1px solid black",
          }}
        />
        {/* <ArrowDropDownOutlinedIcon /> */}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></div>
          <img
            src={user.profile_pic}
            alt="user"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50px",
              border: "1px solid black",
            }}
          />
          <h5>{user.name}</h5>
          <span>Email: {user.email}</span>
        </Box>
      </Modal>
      {/* {console.log(user)} */}
    </div>
  );
};
