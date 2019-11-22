import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import CustomTable from "../../components/customTable/CustomTable";
import { getUserList } from "../../store/actions/users";
import { sendSms } from "../../api/mutations";

import cssClasses from "./AdminPanel.module.css";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    console.log({ history: props.history, match: props.match });
    this.state = {
      tableRows: [],
      loading: true,
      message: "No Users Found",
      headers: ["uid", "email", "displayName", "phoneNumber", "edit"],
      phoneNumber: "",
      sendingSms: false,
      smsLink: "",
      error: null,
      dialogOpen: false
    };
  }
  /**
   * fetches userList on mount
   */
  componentDidMount() {
    this.props.onGetUserList();
  }

  changeInput = event => {
    const phoneNumber = event.target.value;
    this.setState({
      phoneNumber
    });
  };

  sendSMS = () => {
    console.log("sendSMS", this.state.phoneNumber);

    if (this.state.phoneNumber.length > 0) {
      this.setState({ sendingSms: true, error: null }, () => {
        sendSms(this.state.phoneNumber)
          .then(res => {
            console.log(res);
            const { id, success, message } = res.data.sendSms;
            if (success) {
              this.setState({
                sendingSms: false,
                dialogOpen: true,
                smsLink: `https://wealthpark-te-test.firebaseapp.com/signUp/${id}`
              });
            } else {
              this.setState({
                sendingSms: false,
                dialogOpen: true,
                error: `${message}`
              });
            }
          })
          .catch(err => {
            this.setState({
              sendingSms: false,
              dialogOpen: true,
              error: `${err}`
            });
          });
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div>AdminPanel</div>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={cssClasses.addButtonRow}
        >
          <div className={cssClasses.smsBox}>
            <TextField
              id="standard-phoneNumber-input"
              label="Phone number"
              disabled={this.state.sendingSms}
              value={this.state.phoneNumber}
              placeholder="+818012341234"
              onChange={this.changeInput}
              className={cssClasses.input}
              margin="normal"
            />
            <Button
              disabled={this.state.sendingSms}
              onClick={this.sendSMS}
              variant="contained"
              color="primary"
              aria-label="Add User"
            >
              Send SMS sign-up
            </Button>
          </div>
          <Link
            to="/adminPanel/addUser"
            className={cssClasses.buttons}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary" aria-label="Add User">
              Add User
            </Button>
          </Link>
          <Tooltip title="Refresh List" placement="top">
            <IconButton
              aria-label="Refresh button"
              onClick={this.props.onGetUserList}
              className={cssClasses.buttons}
            >
              <RotateLeftIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
        {this.props.loadingUsers ? (
          <div className="localLoading" />
        ) : this.props.users.length > 0 ? (
          <CustomTable headers={this.state.headers} rows={this.props.users} />
        ) : (
          <div>{this.props.error}</div>
        )}
        <Dialog
          open={this.state.dialogOpen}
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            SMS link {this.state.error ? "Failed" : "Send"}
          </DialogTitle>
          <DialogContent>
            <>
              <div>
                {this.state.error
                  ? "Sorry a error occurred:"
                  : "Please send an actual SMS with the following link:"}
              </div>
              <div>
                {this.state.error ? (
                  `${this.state.error}`
                ) : (
                  <div>
                    <div>Link: </div>
                    <div className={cssClasses.smsLink}>
                      {this.state.smsLink}
                    </div>
                  </div>
                )}
              </div>
            </>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loadingUsers: state.users.loadingUsers,
  users: state.users.usersList,
  error: state.users.error
});

const mapDispatchToProps = dispatch => ({
  onGetUserList: (email, password) => dispatch(getUserList(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
