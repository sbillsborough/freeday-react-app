import React, { useState } from "react";

function UserLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Toggle login/register mode
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isRegistering
      ? "http://localhost:8000/api/register"
      : "http://localhost:8000/api/login";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          onLogin(data); // Expecting `{ _id, name }`
          localStorage.setItem("userId", data._id);
        }
      })
      .catch(() => setError("Server error. Please try again."));
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "Create an account"}
      </button>
    </div>
  );
}

export default UserLogin;
