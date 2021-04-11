import React, { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerUsers() {
    const response = await fetch("./register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status !== 200) {
      console.log("Can't sign up current user. Please try again.");
    } else {
      window.location.href = "/home";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUsers();
  };

  return (
    <div>
      <form id="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="sign-up-username"
          name="username"
          value={username}
          className="form-control text-content"
          placeholder="New Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="sign-up-password"
          value={password}
          name="password"
          className="form-control text-content"
          placeholder="New Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="w-100 btn btn-lg btn-success sign-up-btn"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
