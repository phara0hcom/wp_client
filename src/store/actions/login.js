import * as actionsTypes from "../actions/actionTypes";
import { getCookie } from "../../shared/functions/utils";

export const getAuthorization = () => dispatch => {
  //call backend to validate token
  
};

export const getToken = () => dispatch => {
  const loginToken = getCookie("loginToken");
  dispatch({
    type: actionsTypes.LOGIN_SET_TOKEN
  });

  if (loginToken && typeof loginToken === "string") {
    dispatch(getAuthorization(loginToken));
  }
};

export const login = (email, password) => dispatch => {
  //call backend with login callgit 
}