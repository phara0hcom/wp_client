import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminPanel from "../containers/adminPanel/AdminPanel";
import UserEditor from "../containers/userEditor/UserEditor";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route
        path={["/adminPanel/edit/:uid", "/adminPanel/addUser"]}
        render={routProps => <UserEditor {...routProps} />}
      />

      <Route path="/adminPanel">
        <AdminPanel />
      </Route>
      <Redirect to="/adminPanel" />
    </Switch>
  );
};

export default AdminRoutes;
