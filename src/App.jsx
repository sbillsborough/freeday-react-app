import React, { useState, useEffect } from "react";
import "./App.css";
import AddUserButton from "./components/AddUserButton.jsx";
import BasicTextFields from "./components/AddNameTextField.jsx";
import DateSelector from "./components/DateCalender.jsx";

function App() {
  const [message, setMessage] = useState("");
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error: unable to load message"));
  }, []);

  const handleAddUserClick = () => {
    setIsTextFieldVisible(true);
  };

  return (
    <>
      <div className="App">
        <h1>{message}</h1>
      </div>
      <AddUserButton onAddUserClick={handleAddUserClick} />
      {isTextFieldVisible && <BasicTextFields />}
      <DateSelector />
    </>
  );
}

export default App;
