import React, { useState, useEffect } from "react";
import "./App.css";
import UserLogin from "./components/UserLogin.jsx";
import BasicTextFields from "./components/AddNameTextField.jsx";
import DateSelector from "./components/DateCalender.jsx";
import ActionButton from "./components/ActionButton.jsx";
import FetchDays from "./components/FetchDays.jsx";
import background from "./assets/images/tropical-beach.jpg";

function App() {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [nameConfirmed, setNameConfirmed] = useState(false);

  // Fetch welcome message
  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error: unable to load message"));
  }, []);

  // Fetch full user data after login
  useEffect(() => {
    if (user && user._id && step === 0) {
      fetch(`http://localhost:8000/api/users/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setUserName(data.name || ""); // Preload field if available
          setNameConfirmed(!!data.name); // True only if the name already exists
          if (step === 0) setStep(1);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          alert("Could not verify user details.");
        });
    }
  }, [user]);

  const handleConfirm = () => {
    if (!user || !user._id || !user.name?.trim() || !user.password?.trim()) {
      console.error("Error: User data is incomplete", user);
      alert(
        `Error: User data is incomplete.\n${JSON.stringify(user, null, 2)}`
      );
      return;
    }

    const requestBody = {
      name: user.name,
      dates: selectedDates,
    };

    const url = `http://localhost:8000/api/users/${user._id}`;
    const method = "PUT";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data._id) {
          alert("Failed to save user. Please try again.");
          return;
        }

        setUser((prevUser) => ({ ...prevUser, _id: data._id }));
        alert("User and dates saved successfully!");
        setStep(4);
      })
      .catch((error) => console.error("Failed to save data:", error.message));
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <h1>{message}</h1>

      {!user ? (
        <UserLogin onLogin={setUser} />
      ) : (
        <>
          {step > 0 && step < 4 && (
            <div style={{ marginBottom: "1rem" }}>
              <p className="step-text">Step {step} of 3</p>
              <ActionButton onClick={handleBack} label="Back" />
            </div>
          )}

          {step === 0 && (
            <ActionButton onClick={() => setStep(1)} label="Add User" />
          )}

          {step === 1 && (
            <>
              <BasicTextFields userName={userName} setUserName={setUserName} />

              {!nameConfirmed ? (
                // If name does NOT exist, force user to input one
                <ActionButton
                  onClick={() => {
                    if (!userName.trim()) {
                      alert("Please enter a name");
                      return;
                    }

                    const updatedUser = { ...user, name: userName.trim() };
                    setUser(updatedUser);
                    setStep(2);
                  }}
                  label="Save User"
                />
              ) : (
                // If name exists, show both "Edit Name" and "Continue Without Editing"
                <div
                  style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
                >
                  <ActionButton
                    onClick={() => {
                      if (!userName.trim()) {
                        alert("Please enter a name");
                        return;
                      }

                      const updatedUser = { ...user, name: userName.trim() };
                      setUser(updatedUser);
                      setNameConfirmed(true);
                      setStep(2);
                    }}
                    label="Edit Name"
                  />
                  <ActionButton
                    onClick={() => {
                      setUserName(user.name); // Ensure state is synced
                      setNameConfirmed(true);
                      setStep(2);
                    }}
                    label="Continue Without Editing"
                  />
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <DateSelector
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
              />
              <ActionButton onClick={() => setStep(3)} label="Save Dates" />
            </>
          )}

          {step === 3 && (
            <ActionButton onClick={handleConfirm} label="Confirm" />
          )}

          {step === 4 && user._id && (
            <>
              <FetchDays userId={user._id} />
              <ActionButton
                onClick={() => {
                  setStep(0);
                  setUser("");
                  setUserName("");
                  setSelectedDates([]);
                  localStorage.removeItem("userId");
                }}
                label="Start Over"
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
