import React from "react";
import { Button } from "@mui/material";

function StartButton() {
  const handleClick = () => {
    console.log("Start button clicked!");
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      Add User
    </Button>
  );
}

export default StartButton;
