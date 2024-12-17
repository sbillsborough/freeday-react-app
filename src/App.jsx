import React, { useState, useEffect } from "react";
import "./App.css";
import BasicTextFields from "./components/AddNameTextField.jsx";
import DateSelector from "./components/DateCalender.jsx";
import ActionButton from "./components/ActionButton.jsx";

function App() {
  const [message, setMessage] = useState("");
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error: unable to load message"));
  }, []);

  const handleAddUserClick = () => {
    setIsTextFieldVisible(true);
  };

  const handleSaveUser = () => {
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User saved:", data);
        alert("User saved successfully!");
      })
      .catch((err) => {
        console.error("Error saving user:", err);
        alert("Failed to save user.");
      });
  };

  return (
    <>
      <div className="App">
        <h1>{message}</h1>
      </div>

      {/* Replaced AddUserButton with ActionButton */}
      <ActionButton onClick={handleAddUserClick} label="Add User" />

      {isTextFieldVisible && (
        <>
          <BasicTextFields userName={userName} setUserName={setUserName} />
          {/* Replaced SaveUserButton with ActionButton */}
          <ActionButton onClick={handleSaveUser} label="Save User" />
        </>
      )}

      <DateSelector />
    </>
  );
}

export default App;
