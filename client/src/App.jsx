import React, { useState, useEffect } from "react";
import "./App.css";
import BasicTextFields from "./components/AddNameTextField.jsx";
import DateSelector from "./components/DateCalender.jsx";
import ActionButton from "./components/ActionButton.jsx";

function App() {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
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

  const handleSaveUser = () => {
    setUserData((prevData) => ({ ...prevData, name: userName }));
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then(() => alert("User and dates saved successfully!"))
      .catch(() => alert("Failed to save data."));
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

      {step === 3 && <ActionButton onClick={handleConfirm} label="Confirm" />}
    </>
  );
}

export default App;
