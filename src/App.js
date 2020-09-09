import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Survey from "./components/survey";
import Category from "./components/category";
import Result from "./components/result";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Survey}>
          </Route>
          <Route path="/categories/:categoryId" component={Category}>
          </Route>
          <Route path="/results/:categoryId" component={Result}>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
