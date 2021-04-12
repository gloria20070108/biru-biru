import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  async function signIn() {
    const response = await fetch("/login", {
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
      console.log("Can't signin current user. Please try again.");
      setFlag(true);
    } else {
      window.location.href = "/home";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("calling submit function");
    signIn();
  };

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
              <div className="mb-2">
                <label for="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  className="form-control text-content"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <br />
              </div>
              <div className="mb-3">
                <label for="passport" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control text-content"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              {flag && (
                <p className="errorMsg">
                  Can not sigin the user, please try again.
                </p>
              )}
              <div>
                <input
                  className="w-100 btn btn-lg btn-success sign-up-btn"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <div className="center-font">
              <Link to="/signup" variant="body2">
                Not have an account ? Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
