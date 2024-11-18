import React, { useState, useEffect } from "react";
import "./App.css";
import StartButton from "./components/StartButton.js";
import DateTimeSelector from "./components/DateTimePicker.js";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error: unable to load message"));
  }, []);

  return (
    <>
      <div className="App">
        <h1>{message}</h1>
      </div>
      <StartButton />
      <DateTimeSelector />
    </>
  );
}

export default App;
