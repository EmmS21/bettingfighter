import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/pages/Landing.js";
import Login from "views/pages/Login.js";
import Profile from "views/pages/Profile.js";
import Register from "views/pages/Register.js";
import { PropDrillingProvider } from "contexts/PropDrilling";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PropDrillingProvider>
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={(props) => <Landing {...props} />} />
      <Route
        path="/login-page"
        exact
        render={(props) => <Login {...props} />}
      />
      <Route
        path="/profile-page"
        exact
        render={(props) => <Profile {...props} />}
      />
      <Route
        path="/register-page"
        exact
        render={(props) => <Register {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
  </PropDrillingProvider>
);
