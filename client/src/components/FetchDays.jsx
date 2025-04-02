import React, { useState, useEffect } from "react";

function FetchDays() {
  const [userData, setUserData] = useState([]);
  const [matchingDates, setMatchingDates] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const storedUserId = localStorage.getItem("userId");

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

    // Populate dateMap with users for each date
    users.forEach((user) => {
      if (!user.dates || !Array.isArray(user.dates)) return;
      user.dates.forEach((date) => {
        if (!dateMap[date]) dateMap[date] = [];
        dateMap[date].push(user.name);
      });
    });

    // Find all dates with more than one user
    const matches = Object.entries(dateMap)
      .filter(([_, names]) => names.length > 1) // Keep only shared dates
      .map(([date, names]) => ({ date, names }));

    setMatchingDates(matches);

    // **Create a user-specific match list**
    let userSpecificMatches = {};

    matches.forEach(({ date, names }) => {
      names.forEach((name) => {
        if (!userSpecificMatches[name]) userSpecificMatches[name] = [];
        userSpecificMatches[name].push({
          date,
          others: names.filter((n) => n !== name), // Exclude self
        });
      });
    });

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
        {Object.entries(userMatches).map(([user, matches]) => (
          <li key={user}>
            <strong>{user}</strong> has free days with:
            <ul>
              {matches.map((match, index) => (
                <li key={index}>
                  <strong>{match.date}</strong>: {match.others.join(", ")}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchDays;
