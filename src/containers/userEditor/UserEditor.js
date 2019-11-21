import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import { userTypes } from "../../shared/constants";

import cssClasses from "./UserEditor.module.css";
import { addUser, deleteUser, editUser } from "../../api/mutations";
import { resetUserPassword, getUser } from "../../api/queries";

class UserEditor extends Component {
  constructor(props) {
    super(props);

    this.url = props.match.url;
    this.uid = props.match.params.uid;
    const inEditMode = this.url.includes("/edit/") && this.uid;
    this.state = {
      inEditMode,
      error: "",
      editDone: false,
      inProgress: false,
      dialogOpen: false,
      dialogDeleteAction: false,
      dialogHeader: "",
      dialogBody: null,
      userToEdit: {}
    };
  }

  componentDidMount() {
    if (
      this.uid &&
      (this.props.user.type === "admin" ||
        (this.props.user.type !== "admin" && this.uid === this.props.user.uid))
    ) {
      this.onGetUserDetails(this.uid, this.props.usersList);
    } else {
    }
  }

  onGetUserDetails = (uid, usersList) => {
    const userInList = usersList.filter(el => el.uid === uid);
    if (userInList.length > 0) {
      this.setState({
        userToEdit: { ...userInList[0] }
      });
    } else {
      getUser(uid)
        .then(res => {
          const userToEdit = res.data.getUser.user;
          this.setState({
            userToEdit
          });
        })
        .catch(error => {
          this.setState({
            error
          });
        });
    }
  };

  changeInput = input => event => {
    const value = event.target.value;
    this.setState(prevState => ({
      userToEdit: { ...prevState.userToEdit, [input]: value }
    }));
  };

  submitForm = event => {
    event.preventDefault();
    const user = { ...this.state.userToEdit };
    this.setState({ error: "", inProgress: true });

    if (this.state.inEditMode) {
      //do edit call
      const data = {
        email: user.email,
        ...(user.password && user.password.length > 0
          ? { password: user.password }
          : {}),
        ...(user.displayName && user.displayName.length > 0
          ? { displayName: user.displayName }
          : {}),
        ...(user.phoneNumber && user.phoneNumber.length > 0
          ? { phoneNumber: user.phoneNumber }
          : {})
      };
      if (this.props.user.type === "admin") {
        data.type = user.type;
      }

      editUser(this.uid, data)
        .then(res => {
          const { success, message } = res.data.editUser;
          if (success) {
            this.setState({ error: "Edit Done", inProgress: false });
          } else {
            this.setState({ error: `${message}`, inProgress: false });
          }
        })
        .catch(err => {
          this.setState({
            error: `${JSON.stringify(err)}`,
            inProgress: false
          });
        });
    } else {
      //create new user call
      addUser(user)
        .then(res => {
          const { success, message } = res.data.addUser;
          if (!success) {
            this.setState({ error: message });
          } else {
            this.setState({ editDone: true });
            //redirect
          }
        })
        .catch(err => {
          this.setState({ error: `${err}` });
        });
    }
  };

  onDeleteUser = () => {
    this.setState({
      dialogOpen: true,
      dialogFullW: false,
      dialogDeleteAction: true,
      dialogHeader: `Are you sure you want to Delete this user?`,
      dialogBody: (
        <div>
          <div>uid: {this.state.userToEdit.uid}</div>
          <div>email: {this.state.userToEdit.email}</div>
        </div>
      )
    });
  };

  handleClose = () => {
    if (!this.state.inProgress) {
      this.setState({
        dialogOpen: false
      });
    }
  };

  handelDelete = () => {
    this.setState({
      inProgress: true
    });
    //do delete call
    deleteUser(this.state.userToEdit.uid)
      .then(res => {
        const { success, message } = res.data.deleteUser;
        if (success) {
          this.setState({
            inProgress: true,
            dialogHeader: `User Deleted!`,
            dialogBody: <p>{"Redirecting in 5 seconds"}</p>
          });
          setTimeout(() => {
            this.setState({
              editDone: true
            });
          }, 5000);
        } else {
          this.setState({
            inProgress: false,
            dialogOpen: false,
            error: `Delete Error: ${message}`
          });
        }
      })
      .catch(err => {
        this.setState({
          inProgress: false,
          dialogOpen: false,
          error: `Delete Error: ${err}`
        });
      });
  };

  resetPassword = () => {
    this.setState({ error: "", inProgress: true });
    resetUserPassword(this.state.userToEdit.email)
      .then(res => {
        const { success, message } = res.data.sendReset;
        if (success) {
          this.setState({
            inProgress: false,
            dialogOpen: true,
            dialogFullW: true,
            dialogDeleteAction: false,
            dialogHeader: `Sorry no time to setup email server`,
            dialogBody: (
              <div>
                <div>please email the link</div>
                <div>link: {message}</div>
                <div>to email: {this.state.userToEdit.email}</div>
              </div>
            )
          });
        } else {
          this.setState({ error: `${message}`, inProgress: false });
        }
      })
      .catch(err => {
        this.setState({ error: `${err}`, inProgress: false });
      });
  };

  render() {
    const { userToEdit } = this.state;
    if (this.state.editDone) return <Redirect to="/" />;
    return (
      <div className="wrapper">
        <Paper className="paper">
          {this.state.inEditMode ? (
            <>
              <h2>Edit User</h2>
              {!this.uid ||
              (this.uid && this.uid === this.state.userToEdit.uid) ? (
                <div className={cssClasses.ButtonRow}>
                  {this.props.user.type === userTypes.admin ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={this.state.inProgress}
                      className={cssClasses.button}
                      type="submit"
                      onClick={this.onDeleteUser}
                      startIcon={<DeleteIcon />}
                    >
                      Delete User
                    </Button>
                  ) : null}
                  <Button
                    variant="contained"
                    color="default"
                    disabled={this.state.inProgress}
                    className={cssClasses.button}
                    onClick={this.resetPassword}
                    startIcon={<LockIcon />}
                  >
                    Reset Password
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <h2>Add User</h2>
          )}
          <div className="error">{this.state.error}</div>
          {!this.uid || (this.uid && this.uid === this.state.userToEdit.uid) ? (
            <form onSubmit={this.submitForm}>
              <div className={cssClasses.inputs}>
                {this.props.user.type === userTypes.admin ? (
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      disabled={this.state.inProgress}
                      value={userToEdit.type || "user"}
                      onChange={this.changeInput("type")}
                    >
                      {Object.keys(userTypes).map((key, index) => (
                        <MenuItem
                          key={`menuUserType${key}${index}`}
                          value={userTypes[key]}
                        >
                          {userTypes[key]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : null}
                <TextField
                  id="standard-emailAddress-input"
                  label="email address"
                  value={userToEdit.email || ""}
                  placeholder="name@domain.com"
                  disabled={this.state.inProgress}
                  required
                  onChange={this.changeInput("email")}
                  className={cssClasses.input}
                  margin="normal"
                />
                {this.props.user.type === userTypes.admin ? (
                  <TextField
                    id="standard-password-input"
                    label="Password"
                    value={userToEdit.password || ""}
                    type="password"
                    required
                    disabled={this.state.inProgress}
                    className={cssClasses.input}
                    autoComplete="current-password"
                    onChange={this.changeInput("password")}
                    margin="normal"
                  />
                ) : null}

                <TextField
                  id="standard-displayName-input"
                  label="displayName"
                  value={userToEdit.displayName || ""}
                  placeholder="Jane Smith"
                  disabled={this.state.inProgress}
                  onChange={this.changeInput("displayName")}
                  className={cssClasses.input}
                  margin="normal"
                />
                <TextField
                  id="standard-phoneNumber-input"
                  label="Phone number"
                  disabled={this.state.inProgress}
                  value={userToEdit.phoneNumber || ""}
                  placeholder="+818012341234"
                  onChange={this.changeInput("phoneNumber")}
                  className={cssClasses.input}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={this.state.inProgress}
                  className={cssClasses.buttonSubmit}
                  type="submit"
                  onClick={this.submitForm}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </div>
            </form>
          ) : (
            <div className="localLoading" />
          )}
        </Paper>
        <Dialog
          fullWidth={this.state.dialogFullW}
          maxWidth="lg"
          open={this.state.dialogOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.dialogHeader}
          </DialogTitle>
          <DialogContent>{this.state.dialogBody}</DialogContent>
          <DialogActions>
            <Button
              disabled={this.state.inProgress}
              onClick={this.handleClose}
              color="primary"
            >
              Close
            </Button>
            {this.state.dialogDeleteAction ? (
              <Button
                disabled={this.state.inProgress}
                onClick={this.handelDelete}
                color="secondary"
                autoFocus
              >
                Delete
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  usersList: state.users.usersList,
  user: state.login.user,
  error: state.users.error
});

export default connect(mapStateToProps)(UserEditor);
