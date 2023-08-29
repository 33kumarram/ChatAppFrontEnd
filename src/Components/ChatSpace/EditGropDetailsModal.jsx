import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { API_URLS } from "../Services/ApiUrls";
import { CustomAlert } from "../customAlerts/customAlert";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const EditGroupDetailsModal = ({ chat }) => {
  const dispatch = useDispatch();
  const { selectChat, updateChatFromMyChats, removeChatFromMyChats } =
    bindActionCreators(actionCreators, dispatch);
  const { selectedChat, user } = useSelector((state) => state);

  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [chatName, setChatName] = useState("");
  const [alert, setAlert] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = async (username) => {
    const res = await API_URLS.searchUsers(username);
    if (res.isSuccess) setSearchResult(res.data.slice(0, 4));
  };

  const handleChange = (name) => {
    setChatName(name);
  };

  const addToGroup = async (chatId, userId) => {
    if (
      selectedChat?.users.filter((suser) => {
        return suser._id === userId;
      }).length > 0
    ) {
      showAlert("User already added", "danger");
      return;
    }
    try {
      let res = await API_URLS.addToGroup({
        chatId: chatId,
        userId: userId,
      });
      if (res.isSuccess) {
        selectChat(res.data);
        updateChatFromMyChats(res.data);
        showAlert("Member added", "success");
      }
    } catch (error) {
      let err =
        typeof error.message === "object"
          ? "Some error occurred"
          : error.message;
      showAlert(err, "danger");
    }
  };

  const removeFromGroup = async (chatId, userId) => {
    if (selectedChat?.users.length <= 2) {
      showAlert("At least two member required", "danger");
      return;
    }
    try {
      let res = await API_URLS.removeFromGroup({
        chatId: chatId,
        userId: userId,
      });
      if (res.isSuccess) {
        selectChat(res.data);
        updateChatFromMyChats(res.data);
        showAlert("Member removed", "success");
      }
    } catch (error) {
      let err =
        typeof error.message === "object"
          ? "Some error occurred"
          : error.message;
      showAlert(err, "danger");
    }
  };

  const leaveGroup = async (chatId, userId) => {
    try {
      let res = await API_URLS.removeFromGroup({
        chatId: chatId,
        userId: userId,
      });
      if (res.isSuccess) {
        selectChat({});
        removeChatFromMyChats(res.data);
        showAlert("Member removed", "success");
      }
    } catch (error) {
      let err =
        typeof error.message === "object"
          ? "Some error occurred"
          : error.message;
      showAlert(err, "danger");
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  const renameGroup = async () => {
    if (chatName === "") return;
    try {
      const res = await API_URLS.renameGroup({
        chatId: chat._id,
        chatName: chatName,
      });
      if (res.isSuccess) {
        showAlert("Group Renamed", "success");
        selectChat(res.data);
        updateChatFromMyChats(res.data);
      }
    } catch (error) {
      let err =
        typeof error.message === "object"
          ? "Some error occurred"
          : error.message;
      showAlert(err, "danger");
    }
  };

  // useEffect(() => selectChat({}), []);

  return (
    <div>
      <button
        style={{ border: "none", background: "none" }}
        onClick={handleOpen}
      >
        <EditIcon fontSize="small" />
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
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            {chat && <h5>{chat.chatName}</h5>}
            {alert && <CustomAlert alert={alert} />}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                width: "100%",
              }}
            >
              {selectedChat &&
                selectedChat.users &&
                selectedChat.users.length > 0 &&
                selectedChat.users.map((selecteduser) => {
                  return (
                    <div
                      style={{
                        backgroundColor: "#BF40BF",
                        color: "white",
                        borderRadius: "5px",
                        fontSize: "small",
                        padding: "2px 4px",
                      }}
                      key={selecteduser._id}
                    >
                      <span>{selecteduser.name}</span>
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          color: "inherit",
                        }}
                        type="button"
                        onClick={() =>
                          removeFromGroup(selectedChat._id, selecteduser._id)
                        }
                      >
                        <CloseIcon fontSize="small" />
                      </button>
                    </div>
                  );
                })}
            </div>
            <div style={{ display: "flex", width: "100%", gap: "10px" }}>
              <input
                style={{
                  borderRadius: "8px",
                  border: "1px solid black",
                  width: "100%",
                }}
                type="text"
                placeholder="Chat Name"
                defaultValue={chatName}
                onChange={(e) => handleChange(e.target.value)}
                required
              />
              <Button variant="contained" size="small" onClick={renameGroup}>
                Update
              </Button>
            </div>
            <input
              style={{ borderRadius: "8px", border: "1px solid black" }}
              type="text"
              placeholder="Add Members eg: John, Luya"
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResult &&
              searchResult.length > 0 &&
              searchResult.map((user) => {
                return (
                  <div
                    style={{
                      height: "60px",
                      backgroundColor: "#E7E7E7",
                      display: "flex",
                      marginTop: "10px",
                      paddingLeft: "8px",
                      alignItems: "center",
                      borderRadius: "5px",
                      gap: "20px",
                      border: "none",
                      width: "100%",
                    }}
                    key={user._id}
                    onClick={() => addToGroup(selectedChat._id, user._id)}
                  >
                    <img
                      src={user.profile_pic}
                      alt="user"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        borderRadius: "30px",
                        border: "1px solid white",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-around",
                      }}
                    >
                      <span>{user.name}</span>
                      <span>
                        <b>Email:</b> {user.email}
                      </span>
                    </div>
                  </div>
                );
              })}
            <Button
              variant="contained"
              color="error"
              size="small"
              style={{ width: "150px", marginLeft: "auto" }}
              onClick={() => leaveGroup(selectedChat._id, user._id)}
            >
              Leave Group
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
