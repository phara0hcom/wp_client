import * as actionTypes from "../actions/actionTypes";
import { listUsers } from "../../api/queries";

export const getUserList = () => dispatch => {
  dispatch({ type: actionTypes.USERS_FETCHING });
  listUsers(1000)
    .then(res => {
      const users = res.data.listUsers.users;
      if (users && users.length > 0) {
        dispatch({
          type: actionTypes.USERS_FETCH_SUCCESS,
          users
        });
      } else {
        dispatch({
          type: actionTypes.USERS_FETCH_SUCCESS,
          users: []
        });
      }
    })
    .catch(err => {
      dispatch({
        type: actionTypes.USERS_FETCH_FAILED,
        err
      });
    });
};
