import React, { useState, useEffect } from "react";

function FetchDays({ userId }) {
  const [userData, setUserData] = useState([]);
  const [matchingDates, setMatchingDates] = useState([]);
  const [userMatches, setUserMatches] = useState([]);

  useEffect(() => {
    handleFetchDays();
  }, []);

  const handleFetchDays = () => {
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

    users.forEach((user) => {
      if (!user.dates || !Array.isArray(user.dates)) return;
      user.dates.forEach((date) => {
        if (!dateMap[date]) dateMap[date] = [];
        dateMap[date].push(user);
      });
    });

    const matches = Object.entries(dateMap)
      .filter(([_, users]) => users.length > 1)
      .map(([date, users]) => ({
        date,
        users: users.map((user) => ({ id: user._id, name: user.name })),
      }));

    setMatchingDates(matches);

    // Find only matches for the logged-in user
    const userSpecificMatches = matches
      .filter((match) => match.users.some((u) => u.id === userId))
      .map(({ date, users }) => ({
        date,
        others: users.filter((u) => u.id !== userId).map((u) => u.name),
      }));

    setUserMatches(userSpecificMatches);
  };

  return (
    <div className="fetch-days-container">
      <h2>Your Free Days with Others!</h2>
      <ul>
        {userMatches.length > 0 ? (
          userMatches.map((match, index) => (
            <li key={index}>
              <strong>{match.date}</strong>: You have free days with{" "}
              <span>{match.others.join(", ")}</span>
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
