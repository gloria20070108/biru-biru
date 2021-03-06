import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [flag, setFlag] = useState(false);

  async function registerUsers() {
    const response = await fetch("/register", {
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
      setFlag(true);
    } else {
      window.location.href = "/signin";
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
    setFlag(false);
  }, [checked]);

  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href={process.env.PUBLIC_URL + "/css/User.css"}
      />
      <div className="user-container">
        <div className="title">
          <h1>Welcome to Biru Biru!</h1>
        </div>
        <div className="row signin-signup-form">
          <div className="col-sm-4 box border">
            <form onSubmit={handleSubmit}>
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
                  Confirm that I am at least 21 years of age
                </label>
                <br />
              </div>
              <br />
              {flag && (
                <p className="errorMsg">
                  Can not create the user, please try again.
                </p>
              )}
              <button
                className="w-100 btn btn-lg btn-success sign-up-btn"
                type="submit"
              >
                Sign up
              </button>
            </form>
            <div className="center-font">
              <Link to="/signin" variant="body2">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer>
        Photo by{" "}
        <a href="https://unsplash.com/@georgeallancox?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          George Cox
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/beer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </footer>
    </div>
  );
}

SignupPage.propTypes = {};
