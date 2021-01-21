import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth';

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register" component={Auth(RegisterPage,false) } />
          <Route path="/login" component={Auth(LoginPage, false) } />
          <Route path="/" component={Auth(LandingPage, false) } />
        </Switch>
      </div>
    </Router>
  );
}