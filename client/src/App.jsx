import React, { useState, useEffect } from "react";
import "./App.css";
import UserLogin from "./components/UserLogin.jsx";
import BasicTextFields from "./components/AddNameTextField.jsx";
import DateSelector from "./components/DateCalender.jsx";
import ActionButton from "./components/ActionButton.jsx";
import FetchDays from "./components/FetchDays.jsx";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [user, setUser] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [userData, setUserData] = useState({ name: "", dates: [] });

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error: unable to load message"));
  }, []);

  const handleConfirm = () => {
    fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: user.name, dates: selectedDates }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server Response:", data);
        localStorage.setItem("userId", data._id);
        setUser((prevUser) => ({ ...prevUser, _id: data._id })); // Update user state
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

      {!user ? (
        <UserLogin onLogin={setUser} />
      ) : (
        <>
          {step === 0 && (
            <ActionButton onClick={() => setStep(1)} label="Add User" />
          )}

          {step >= 1 && (
            <>
              <BasicTextFields userName={user.name} />
              <ActionButton onClick={() => setStep(2)} label="Save User" />
            </>
          )}

          {step >= 2 && (
            <>
              <DateSelector
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
              />
              <ActionButton onClick={() => setStep(3)} label="Save Dates" />
            </>
          )}

          {step >= 3 && (
            <ActionButton onClick={handleConfirm} label="Confirm" />
          )}

          {step === 4 && <FetchDays userId={user._id} />}
        </>
      )}
    </>
  );
}

export default App;
