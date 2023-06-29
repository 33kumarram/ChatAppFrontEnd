import { SearchOutlined } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { API_URLS } from "../Services/ApiUrls";
import { actionCreators } from "../../Redux/actionCreators";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export const SearchUser = ({ setOpenDrawer }) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchField, setSearchField] = useState("");
  const dispatch = useDispatch();
  const { selectChat, addChatInMyChats } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleSearch = async () => {
    setSearchResult([]);
    setLoading(true);
    const res = await API_URLS.searchUsers(searchField);
    // console.log(res);
    if (res.isSuccess) {
      setSearchResult(res.data);
    }
    setLoading(false);
  };

  const accessChat = async (userId) => {
    const { isSuccess, data } = await API_URLS.accessChat(userId);
    if (isSuccess) {
      selectChat(data);
      addChatInMyChats(data);
      setOpenDrawer(false);
    }
  };

  return (
    <div style={{ margin: "15px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search User"
          onChange={(e) => setSearchField(e.target.value)}
        />
        <button onClick={() => handleSearch()}>
          <SearchOutlined />
        </button>
      </div>
      {loading && (
        <div style={{ marginTop: "15px" }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      )}
      <div style={{ marginTop: "30px" }}>
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
                  gap: "10px",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  ":hover": {
                    backgroundColor: "#38B2AC",
                  },
                }}
                key={user._id}
                onClick={() => accessChat(user._id)}
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
      </div>
    </div>
  );
};
