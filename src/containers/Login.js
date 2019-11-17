import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import cssClasses from "./Login.module.css";
import { Button } from "@material-ui/core";

const Login = () => {
  return (
    <div className="wrapper">
      <Paper className={cssClasses.paper}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="h5" component="h3">
            Please login.
          </Typography>
          <div className={cssClasses.inputs}>
            <TextField
              id="standard-emailAddress-input"
              label="email address"
              placeholder="name@domain.com"
              className={cssClasses.input}
              margin="normal"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              className={cssClasses.input}
              autoComplete="current-password"
              margin="normal"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className={cssClasses.button}
          >
            Login
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
