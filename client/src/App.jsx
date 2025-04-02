import React, { useState, useEffect } from "react";
import "./App.css";
import BasicTextFields from "./components/AddNameTextField.jsx";
import DateSelector from "./components/DateCalender.jsx";
import ActionButton from "./components/ActionButton.jsx";
import FetchDays from "./components/FetchDays.jsx";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [userData, setUserData] = useState({ name: "", dates: [] });

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error: unable to load message"));
  }, []);

  const handleAddUserClick = () => setStep(1);

  // Saves a new user with a unique ID and saves it to local storage
  const handleSaveUser = () => {
    const newUserId = uuidv4();
    setUserId(newUserId);
    localStorage.setItem("userId", newUserId);
    setUserData({ id: newUserId, name: userName, dates: [] });
    setStep(2);
  };

  const handleSaveDate = () => {
    if (selectedDates.length > 0) {
      setUserData((prevData) => ({
        ...prevData,
        dates: [
          ...prevData.dates,
          ...selectedDates.filter((date) => !prevData.dates.includes(date)),
        ],
      }));
    }
    setStep(3);
  };

  const handleConfirm = () => {
    fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName, dates: selectedDates }), // Don't send `id`
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server Response:", data);
        localStorage.setItem("userId", data._id); // Store MongoDB _id, not UUID
        setUserId(data._id); // Update state with correct ID
        alert("User and dates saved successfully!");
      })
      .catch((error) => console.error("Failed to save data:", error.message));

    setStep(4);
  };

  return (
    <>
      <div className="App">
        <h1>{message}</h1>
      </div>

      {step === 0 && (
        <ActionButton onClick={handleAddUserClick} label="Add User" />
      )}

      {step >= 1 && (
        <>
          <BasicTextFields userName={userName} setUserName={setUserName} />
          <ActionButton onClick={handleSaveUser} label="Save User" />
        </>
      )}

      {step >= 2 && (
        <>
          <DateSelector
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
          <ActionButton onClick={handleSaveDate} label="Save Dates" />
        </>
      )}

      {step >= 3 && <ActionButton onClick={handleConfirm} label="Confirm" />}

      {step === 4 && <FetchDays />}
    </>
  );
}

export default App;
