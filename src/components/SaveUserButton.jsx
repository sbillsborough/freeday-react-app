import { Button } from "@mui/material";

function SaveUserButton({ onSaveUser }) {
  return (
    <Button variant="contained" onClick={onSaveUser}>
      Save User
    </Button>
  );
}

export default SaveUserButton;
