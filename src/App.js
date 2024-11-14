import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <>
      <div className="App">
        <h1>{message}</h1>
      </div>
      <div>
        <Button variant="contained" color="primary">
          Hello MUI
        </Button>
      </div>
    </>
  );
}

export default App;
