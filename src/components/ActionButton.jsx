import { Button } from "@mui/material";

function ActionButton({ onClick, label }) {
  return (
    <Button variant="contained" onClick={onClick}>
      {label}
    </Button>
  );
}

export default ActionButton;
