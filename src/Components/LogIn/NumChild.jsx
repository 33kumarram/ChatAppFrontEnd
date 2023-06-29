import React, { useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
export const NumChild = ({ setNum, num }) => {
  function increase() {
    setNum(num + 1);
  }
  function decrease() {
    setNum(num - 1);
  }

  async function fetchData(params) {
    try {
      let res = await axios({
        headers: {
          "Content-Type": "pplication/json",
        },
        method: "post",
        url: "/data/fetch",
        data: params,
      });
    } catch (err) {
      console.log(err);
    }
  }

  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button onClick={increase} color="primary" variant="contained">
        Increase
      </Button>
      <Button onClick={decrease} color="secondary" variant="contained">
        Decrease
      </Button>
    </div>
  );
};
