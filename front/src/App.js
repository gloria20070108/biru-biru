import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navigation from "./Components/Navigation";
import HomePage from "./Pages/HomePage";
import DetailPage from "./Pages/DetailPage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navigation />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/detail/:id">
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
