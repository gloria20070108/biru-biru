import React, { useState } from "react";
import { Link } from "react-router-dom";
//import "./Login.css";
export default function SigninPage() {
  return (
    <div className="container-fluid signiniterm">
      <div className="title">
        <h1>Welcome to Biru Biru!</h1>
      </div>
      <div className="row">
        <div className="col-sm-4 box border">
          <form id="sign-in-form" action="/login" method="post">
            <div className="mb-2">
              <label for="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="form-control text-content"
                placeholder="Username"
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
                className="form-control text-content"
                placeholder="Password"
              />
            </div>
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
  );
}
