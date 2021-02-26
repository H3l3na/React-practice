import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Employees from "./employees";
import Auth from './Auth';
import Reports from './reports';
import Departments from '../Pages/Departments';
import Categories from '../Pages/categories';

export default function App() {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/employees" component={Employees} />
      <Route path="/login" component={Auth} />
      <Route path="/reports" component={Reports} />
      <Route path="/departments" component={Departments} />
      <Route path="/categories" component={Categories} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
