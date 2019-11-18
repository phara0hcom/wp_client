import * as actionsTypes from "../actions/actionTypes";
import { getCookie } from "../../shared/functions/utils";
import firebase from "../../shared/firebase";

export const getAuthorization = () => dispatch => {
  //call backend to validate token
};

export const getToken = () => dispatch => {
  const loginToken = getCookie("loginToken");

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
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log({ res });
    })
    .catch(error => {
      console.log({ error });
      dispatch({ type: actionsTypes.LOGIN_ERROR, error: error.message });
    });
};
