import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../containers/home/Home";
import UserEditor from "../containers/userEditor/UserEditor";

const UserRoutes = () => {
  return (
    <Switch>
      <Route path="/edit/:uid">
        <UserEditor />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default UserRoutes;
