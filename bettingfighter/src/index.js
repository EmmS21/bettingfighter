import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Landing from "views/pages/Landing.js";
import { PropDrillingProvider } from "contexts/PropDrilling";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PropDrillingProvider>
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={(props) => <Landing {...props} />} />
    </Switch>
  </BrowserRouter>
  </PropDrillingProvider>
);
