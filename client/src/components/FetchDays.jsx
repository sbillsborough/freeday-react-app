import React, { useState } from "react";
import ActionButton from "./ActionButton";

function FetchDays() {
  const [userData, setUserData] = useState([]);

  const handleFetchDays = () => {
    console.log("Fetching Free Days");

    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data);
        setUserData(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  return (
    <div>
      <ActionButton onClick={handleFetchDays} label="Get Free Days" />
      <ul>
        {userData.map((user, index) => (
          <li key={index}>
            <strong>{user.name}</strong>: {user.dates.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchDays;
