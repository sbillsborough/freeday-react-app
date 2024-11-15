import React, { useState, useEffect } from "react";
import "./App.css";
import StartButton from "./components/StartButton.js";

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
      <StartButton />
    </>
  );
}

export default App;
