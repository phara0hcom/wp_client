import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import Login from "./containers/Login";

import "./App.css";
import { getToken } from "./store/actions/login";

class App extends Component {
  componentDidMount() {
    this.props.getToken();
  }
  render() {
    const isAuthorized = false;
    return (
      <Router>
        <>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            {!isAuthorized ? <Redirect to="/login" /> : null
            // <Route path="/users">
            //   <Users />
            // </Route>
            }
          </Switch>
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
