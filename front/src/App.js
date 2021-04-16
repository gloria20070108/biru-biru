import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePage from "./Pages/HomePage";
import DetailPage from "./Pages/DetailPage";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
      </Switch>
    </Router>
  );
}

App.propTypes = {};
