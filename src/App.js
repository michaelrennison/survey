import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Survey from "./components/survey";
import Category from "./components/category";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Survey}>
          </Route>
          <Route path="/categories/:categoryId" component={Category}>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
