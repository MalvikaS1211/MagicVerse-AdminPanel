import React from "react";
import { SignIn } from "../../services/api_function";
import { NotificationManager } from "react-notifications";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const SET_USER_TASK = "SET_USER_TASK";
export const SET_USER_DETAIL = "SET_USER_DETAIL";
export const SELECT_CHAIN_ACTION = "SELECT_CHAIN_ACTION";

export function Logout(navigate) {
  console.log("heyheyh", navigate, "::");
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(email, password, navigate) {
  // console.log(email, password);
  return (dispatch) => {
    SignIn(email, password)
      .then((response) => {
        console.log(response, "resp");
        if (response) {
          dispatch(loginConfirmedAction(response));
          console.log(response);
          navigate("/dashboard");
          NotificationManager.success("Successfully login");
        } else {
          NotificationManager.error("Invalid Email and Password");
          dispatch(loginFailedAction(response));
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  console.log(data, "::::");
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

