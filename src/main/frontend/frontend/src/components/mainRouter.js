import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Users from "./users";


export default function App() {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/users" component={Users} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
