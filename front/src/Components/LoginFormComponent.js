import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LoginFormComponent = () => {
  const [loggIn, setLoggedIn] = useState(false);

  return (
    <form action="/login" method="post">
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            className="form-control text-content"
            placeholder="New Username"
          />
        </label>
        <br />
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            className="form-control text-content"
            placeholder="New Password"
          />
        </label>
      </div>
      <div>
        <input className="btn btn-primary" type="submit" value="Login" />
      </div>
    </form>
  );
};

LoginFormComponent.propTypes = {};

export default LoginFormComponent;
