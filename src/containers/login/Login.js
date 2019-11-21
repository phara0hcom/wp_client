import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import cssClasses from "./Login.module.css";
import { Button } from "@material-ui/core";
import { loginUser } from "../../store/actions/login";

const Login = props => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const changeInput = input => event => {
    setState({
      ...state,
      [input]: event.target.value
    });
  };

  const submitLogin = event => {
    event.preventDefault();
    props.onLoginUser(state.email, state.password);
  };

  if (props.isAuthorized) {
    return <Redirect to="/" />;
  }
  return (
    <div className="wrapper">
      <Paper className="paper">
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="h5" component="h3">
            Please login.
          </Typography>
          <div className="error">{props.error}</div>
          <form className={cssClasses.inputs} onSubmit={submitLogin}>
            <TextField
              id="standard-emailAddress-input"
              label="email address"
              value={state.email}
              disabled={props.logInProcessing}
              placeholder="name@domain.com"
              required
              onChange={changeInput("email")}
              className={cssClasses.input}
              margin="normal"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              value={state.password}
              type="password"
              disabled={props.logInProcessing}
              required
              className={cssClasses.input}
              autoComplete="current-password"
              onChange={changeInput("password")}
              margin="normal"
            />
          </form>

          <Button
            variant="contained"
            color="primary"
            disabled={props.logInProcessing}
            className={cssClasses.button}
            type="submit"
            onClick={submitLogin}
          >
            {props.logInProcessing ? <div className="localLoading" /> : `Login`}
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => ({
  logInProcessing: state.login.logInProcessing,
  isAuthorized: state.login.isAuthorized,
  error: state.login.error,
  userType: state.login.userType
});

const mapDispatchToProps = dispatch => ({
  onLoginUser: (email, password) => dispatch(loginUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
