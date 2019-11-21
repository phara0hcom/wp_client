import * as actionsTypes from "../actions/actionTypes";
import { getCookie, setCookie } from "../../shared/functions/utils";
import firebase from "../../shared/firebase";
import { authErrorObj } from "../../shared/functions/firebaseError";
import { queryUserDb, authToken } from "../../api/queries";

export const getAuthorization = token => dispatch => {
  authToken(token)
    .then(res => {
      dispatch({
        type: actionsTypes.LOGIN_AUTHORIZE,
        user: res.data.authToken.user
      });
    })
    .catch(err => {
      dispatch({
        type: actionsTypes.LOGIN_NO_TOKEN,
        token: null,
        err
      });
    });
};

export const getToken = () => dispatch => {
  const loginToken = getCookie("loginToken");
  if (typeof loginToken === "string" && loginToken.length > 0) {
    dispatch(getAuthorization(loginToken));
  } else {
    dispatch({
      type: actionsTypes.LOGIN_NO_TOKEN,
      token: null
    });
  }
};

export const loginUser = (email, password) => dispatch => {
  dispatch({ type: actionsTypes.LOGIN_PROCESSING });
  //call backend with login call
  let user;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      const { uid, displayName, email } = res.user;
      user = {
        uid,
        displayName,
        email
      };

      return res.user.getIdToken(false);
      //

      // make a getUser call for the rest of the info
      // make a new get user call for only the userDB
    })
    .then(token => {
      setCookie("loginToken", token, 1);
      return queryUserDb("uid", "==", user.uid);
    })
    .then(res => {
      const { users } = res.data.queryUserDb;

      // setCookie("loginToken", token, 1);
      if (users.length > 0) {
        user = { ...user, ...users[0] };
        dispatch({
          type: actionsTypes.LOGIN_AUTHORIZE,
          user
        });
      } else {
        user = { ...user, type: "user" };
        //TODO: make the user in the userDB
        dispatch({
          type: actionsTypes.LOGIN_AUTHORIZE,
          user
        });
      }
    })
    .catch(err => {
      const error = authErrorObj[err.code];
      dispatch({ type: actionsTypes.LOGIN_ERROR, error, fullError: err });
    });
};
