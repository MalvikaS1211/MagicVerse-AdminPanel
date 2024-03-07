import React from "react";
//import { useNavigate } from "react-router-dom";
import { SignIn } from "../../services/api_function";

import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";
import { NotificationManager } from "react-notifications";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";

export function signupAction(email, password, navigate) {
  return (dispatch) => {
    signUp(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.token);
        runLogoutTimer(
          dispatch,
          response.expiresIn * 1000
          //history,
        );
        dispatch(confirmedSignupAction(response.data));
        navigate("/dashboard");
        //history.push('/dashboard');
      })
      .catch((error) => {
        //  const errorMessage = formatError(error.response.data);
        //  dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function Logout(navigate) {
    //  console.log("adbhhy123654")
	localStorage.removeItem('token');
    navigate('/login');
	//history.push('/login');

  return {
    type: LOGOUT_ACTION,
  };
}
// export function login(email, password) {
//     console.log("fvbsdhvghv",email,password)
//    // const postData = {
//    //     email,
//    //     password,
//    //     returnSecureToken: true,
//    // };

//    return SignIn(email,password,)
//        .then(response => {
//            if(response.status ){
//                // navigate('/dashboard');
//                NotificationManager.success(response.message)
//            }

//        })
//        .catch(error => {
//            console.error("Login failed:", error);
//          NotificationManager.error(error)
//        })
// }

export function loginAction(email, password, navigate) {
  return (dispatch) => {
    SignIn(email, password)
      .then((response) => {
        if (response.status === 200) {
          console.log("expiresIn",response.expiresIn);
          const { token, expiresIn } = response; 
      console.log("fdjgvb",token)
          if (token != "") {
            console.log(response, "in if");
  
          } else {
            console.log("token blank");
          }
        
           runLogoutTimer(dispatch, expiresIn , navigate);
         
          dispatch(
            loginConfirmedAction({
              email: email,
              idToken: email,
              localId: email,
              expiresIn: expiresIn,
              refreshToken: "",
            })
          );
          navigate("/dashboard");
           saveTokenInLocalStorage(response);
          NotificationManager.success(response.message);
        } else {
          NotificationManager.error(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
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
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
