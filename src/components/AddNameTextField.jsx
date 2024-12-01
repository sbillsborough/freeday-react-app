import * as React from "react";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function BasicTextFields({ userName, setUserName }) {
  const handleChange = (e) => {
    setUserName(e.target.value);
  };
  return (
    <TextField
      label="Enter Name"
      variant="outlined"
      value={userName}
      onChange={handleChange}
    />
  );
}

export default BasicTextFields;
