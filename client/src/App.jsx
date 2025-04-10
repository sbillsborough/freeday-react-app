import React, { useState, useEffect } from "react";
import "./App.css";
import UserLogin from "./components/UserLogin.jsx";
import BasicTextFields from "./components/AddNameTextField.jsx";
import DateSelector from "./components/DateCalender.jsx";
import ActionButton from "./components/ActionButton.jsx";
import FetchDays from "./components/FetchDays.jsx";

function App() {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [user, setUser] = useState(""); // was null
  const [userName, setUserName] = useState(""); // Store username
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error: unable to load message"));
  }, []);

  const handleConfirm = () => {
    console.log("Current user state:", user); // Console log for debugging

    if (!user || !user.username || !user.password) {
      console.error("Error: User data is incomplete", user);
      alert("Error: User data is missing. Please log in again.");
      return;
    }

    console.log("Submitting User:", user); // Debugging log
    console.log("Submitting Dates:", selectedDates);

    fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        name: user.name,
        dates: selectedDates,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server Response:", data);

        if (!data._id) {
          alert("Failed to save user. Please try again.");
          return;
        }

        localStorage.setItem("userId", data._id);
        setUser((prevUser) => ({ ...prevUser, _id: data._id })); // Update state
        alert("User and dates saved successfully!");
        setStep(4);
      })
      .catch((error) => console.error("Failed to save data:", error.message));
  };

  return (
    <div className="App">
      <h1>{message}</h1>

      {!user ? (
        <UserLogin onLogin={setUser} />
      ) : (
        <>
          {step === 0 && (
            <ActionButton onClick={() => setStep(1)} label="Add User" />
          )}

          {step >= 1 && (
            <>
              <BasicTextFields userName={userName} setUserName={setUserName} />
              <ActionButton
                onClick={() => {
                  if (!userName.trim()) {
                    alert("Please enter a name");
                    return;
                  }
                  setUser((prevUser) => ({ ...prevUser, name: userName }));
                  console.log("Updated User:", user); // Debug log
                  setStep(2);
                }}
                label="Save User"
              />
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

          {step === 4 && user._id && <FetchDays userId={user._id} />}
        </>
      )}
    </div>
  );
}

export default App;
