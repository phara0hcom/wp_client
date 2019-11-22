import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, useParams, useLocation } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";

import * as actionTypes from "../../store/actions/actionTypes";
import { loginUser } from "../../store/actions/login";
import { signUp } from "../../api/mutations";

import cssClasses from "./Login.module.css";

const Login = props => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  console.log({ pathname, id });
  const isSignUp = id && pathname.includes("/signUp/");
  const [state, setState] = useState({
    email: "",
    password: "",
    dialogOpen: false
  });

  const changeInput = input => event => {
    setState({
      ...state,
      [input]: event.target.value
    });
  };

  const submitLogin = event => {
    event.preventDefault();
    if (isSignUp) {
      dispatch({ type: actionTypes.LOGIN_PROCESSING });
      signUp(id, state.email, state.password)
        .then(res => {
          const { message, success } = res.data.signUp;
          if (success) {
            setState({
              dialogOpen: true
            });
          } else {
            dispatch({
              type: actionTypes.LOGIN_NOT_PROCESSING,
              error: `${message}`
            });
          }
        })
        .catch(err => {
          dispatch({
            type: actionTypes.LOGIN_NOT_PROCESSING,
            error: `${err}`
          });
        });
    } else {
      props.onLoginUser(state.email, state.password);
    }
  };

  const closeDialog = () => {
    window.location.href = "/login";
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
            {isSignUp
              ? `Please enter your details to sign-up`
              : `Please login.`}
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
            {props.logInProcessing ? (
              <div className="localLoading" />
            ) : isSignUp ? (
              `Sign up`
            ) : (
              `Login`
            )}
          </Button>
        </Grid>
      </Paper>
      <Dialog
        open={state.dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Account created</DialogTitle>
        <DialogContent>
          <p>Please login.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
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
