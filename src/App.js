import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import Login from "./containers/login/Login";
import AdminRoutes from "./routes/adminRoutes";
import UserRoutes from "./routes/userRoutes";

import { getToken } from "./store/actions/login";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.getToken();
  }
  render() {
    return (
      <Router>
        <>
          {this.props.loadingToken ? (
            <div className="loading" />
          ) : (
            <Switch>
              <Route path={["/login", "/signUp/:id"]}>
                <Login />
              </Route>
              {!this.props.isAuthorized ? (
                <Redirect to="/login" />
              ) : this.props.userType === "admin" ? (
                <AdminRoutes />
              ) : (
                <UserRoutes />
              )}
              <Redirect to="/" />
            </Switch>
          )}
        </>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  loadingToken: state.login.loadingToken,
  isAuthorized: state.login.isAuthorized,
  userType: state.login.userType,
  displayName: state.login.displayName
});

const mapDispatchToProps = dispatch => ({
  getToken: () => dispatch(getToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
