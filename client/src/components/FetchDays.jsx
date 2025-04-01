import React, { useState, useEffect } from "react";

function FetchDays() {
  const [userData, setUserData] = useState([]);
  const [matchingDates, setMatchingDates] = useState([]);
  const [userMatches, setUserMatches] = useState([]);

  useEffect(() => {
    handleFetchDays();
  }, []);

  const handleFetchDays = () => {
    console.log("Fetching Free Days");

    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data);
        setUserData(data);
        findMatchingDates(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  const findMatchingDates = (users) => {
    let dateMap = {};
    let storedUserId = localStorage.getItem("userId");

    let currentUser = users.find((user) => user.id === userId);

    if (!currentUser) return;

    // Populate dateMap with users for each date
    users.forEach((user) => {
      user.dates.forEach((date) => {
        if (!dateMap[date]) dateMap[date] = [];
        dateMap[date].push(user.name);
      });
    });

    // Filter dates that have more than one user
    const matches = Object.entries(dateMap)
      .filter(([_, names]) => names.length > 1)
      .map(([date, names]) => ({ date, names }));

    setMatchingDates(matches);

    // Find only the matches specific to the logged-in user
    const userSpecificMatches = matches.filter((match) =>
      match.names.includes(currentUser.name)
    );

    setUserMatches(userSpecificMatches);
  };

  return (
    <div>
      <h2>All Users & Dates</h2>
      <ul>
        {userData.map((user, index) => (
          <li key={index}>
            <strong>{user.name}</strong>: {user.dates.join(", ")}
          </li>
        ))}
      </ul>

      <h2>Matching Dates</h2>
      <ul>
        {matchingDates.length > 0 ? (
          matchingDates.map((match, index) => (
            <li key={index}>
              <strong>{match.date}</strong>: {match.names.join(", ")}
            </li>
          ))
        ) : (
          <li>No matching dates found.</li>
        )}
      </ul>

      <h2>Your Free Days with Others</h2>
      <ul>
        {userMatches.length > 0 ? (
          userMatches.map((match, index) => (
            <li key={index}>
              <strong>{match.date}</strong>: You have free days with
              {match.names
                .filter(
                  (name) =>
                    name !== userData.find((user) => user.id === userId)?.name
                )
                .join(", ")}
            </li>
          ))
        ) : (
          <li>No free days with others.</li>
        )}
      </ul>
    </div>
  );
}

export default FetchDays;
