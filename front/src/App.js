import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomePage from "./Pages/HomePage.js";
import DetailPage from "./Pages/DetailPage.js";
import SigninPage from "./Pages/SigninPage.js";
import SignupPage from "./Pages/SignupPage.js";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/detail">
          <DetailPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/signin">
          <SigninPage />
        </Route>          
      </Switch>
    </Router>
  );
}

