import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { API_URLS } from "../Services/ApiUrls";
import { CustomAlert } from "../customAlerts/customAlert";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux/actionCreators";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const CreateGroupChatModal = ({ fetchChats }) => {
  const dispatch = useDispatch();
  const { selectChat } = bindActionCreators(actionCreators, dispatch);

  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
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

  const addMembers = (user) => {
    if (
      selectedUsers.filter((suser) => {
        return suser._id === user._id;
      }).length > 0
    ) {
      showAlert("User already added", "danger");
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const removeMember = (userId) => {
    let users = selectedUsers.filter((user) => {
      return user._id !== userId;
    });
    setSelectedUsers(users);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUsers.length < 2) {
      showAlert("Minimum two additinal user required for group chat", "danger");
      return;
    }
    try {
      const res = await API_URLS.createGroupChat({
        users: selectedUsers,
        chatName: chatName,
      });
      if (res.isSuccess) {
        showAlert("Group Created", "success");
        selectChat(res.data);
        fetchChats();
        handleClose();
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
        style={{ border: "none", borderRadius: "5px" }}
        onClick={handleOpen}
      >
        Create Group <AddIcon />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={handleSubmit}
          >
            <h5>New Group Chat</h5>
            {alert && <CustomAlert alert={alert} />}
            <input
              style={{ borderRadius: "8px", border: "1px solid black" }}
              type="text"
              placeholder="Chat Name"
              defaultValue={chatName}
              onChange={(e) => handleChange(e.target.value)}
              required
            />
            <input
              style={{ borderRadius: "8px", border: "1px solid black" }}
              type="text"
              placeholder="Add Members eg: John, Luya"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selectedUsers &&
                selectedUsers.length > 0 &&
                selectedUsers.map((selecteduser) => {
                  return (
                    <div
                      style={{
                        backgroundColor: "#BF40BF",
                        color: "white",
                        fontSize: "small",
                        borderRadius: "5px",
                        padding: "2px 4px",
                      }}
                      key={selectedUsers._id}
                    >
                      <span>{selecteduser.name}</span>
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          color: "inherit",
                        }}
                        type="button"
                        onClick={() => removeMember(selecteduser._id)}
                      >
                        <CloseIcon fontSize="small" />
                      </button>
                    </div>
                  );
                })}
            </div>
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
                    onClick={() => addMembers(user)}
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
            <Button type="submit" variant="contained" color="primary">
              Create Chat
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
