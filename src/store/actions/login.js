import * as actionsTypes from "../actions/actionTypes";
import { getCookie } from "../../shared/functions/utils";
import firebase from "../../shared/firebase";
import { authErrorObj } from "../../shared/functions/firebaseError";
import { queryUserDb, authToken } from "../../api/queries";

export const getAuthorization = () => dispatch => {
  //call backend to validate token
};

export const getToken = () => dispatch => {
  const loginToken = getCookie("loginToken");
  console.log({ ...firebase.auth() });
  // firebase
  //   .auth()
  //   .currentUser.getIdToken(/* forceRefresh */ false)
  //   .then(idToken => authToken(idToken))
  //   .then(res => console.log({ res }))
  //   .catch(err => {
  //     console.log({ err });
  //   });

  if (loginToken && typeof loginToken === "string") {
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
      console.log({ res });
      const { uid, displayName, email } = res.user;
      user = {
        uid,
        displayName,
        email
      };

      return queryUserDb("uid", "==", uid);

      // make a getUser call for the rest of the info
      // make a new get user call for only the userDB
    })
    .then(res => {
      console.log({ res });
      const { users } = res.data.queryUserDb;
      console.log({ users });
      console.log(users.length);
      if (users.length > 0) {
        user = { ...user, ...users[0] };
        console.log({ user });
        dispatch({
          type: actionsTypes.LOGIN_AUTHORIZE,
          user
        });
      } else {
        user = { ...user, type: "user" };
        console.log("not found", { user });
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
