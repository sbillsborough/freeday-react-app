import { Button } from "@mui/material";

function AddUserButton({ onAddUserClick }) {
  return (
    <Button variant="contained" onClick={onAddUserClick}>
      Add User
    </Button>
  );
}

export default AddUserButton;
