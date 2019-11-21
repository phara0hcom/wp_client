import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../containers/home/Home";
import UserEditor from "../containers/userEditor/UserEditor";
import NavBar from "../components/navBar/NavBar";
import Logout from "../containers/logout/Logout";

const UserRoutes = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route
          path="/edit/:uid"
          render={routProps => <UserEditor {...routProps} />}
        />
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </>
  );
};

export default UserRoutes;
