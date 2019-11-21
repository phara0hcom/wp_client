import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import CustomTable from "../../components/customTable/CustomTable";

import cssClasses from "./AdminPanel.module.css";
import { getUserList } from "../../store/actions/users";
class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRows: [],
      loading: true,
      message: "No Users Found",
      headers: ["uid", "email", "displayName", "phoneNumber", "edit"]
    };
  }

  componentDidMount() {
    this.props.onGetUserList();
  }

  render() {
    return (
      <div className="wrapper">
        <div>AdminPanel</div>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={cssClasses.addButtonRow}
        >
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
