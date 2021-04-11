import React, { useState, useEffect } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  async function registerUsers() {
    console.log("calling send data function");
    console.log("username", { username });
    console.log("password", { password });
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
  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("calling submit function");
    registerUsers();
  };

  useEffect(() => {
    console.log("checkItems:", checked);
  }, [checked]);

  return (
    <div>
      <h1>Welcome to Biru Biru!</h1>
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
        <br />
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
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agecheckbox"
            checked={checked}
            onChange={handleCheckbox}
            required="required"
          />
          <label className="form-check-label" for="agecheck">
            Older than 21 years old
          </label>
        </div>
        <br />
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
