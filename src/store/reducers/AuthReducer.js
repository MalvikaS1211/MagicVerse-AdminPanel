import { LOGIN_CONFIRMED_ACTION, LOGOUT_ACTION } from "../actions/AuthActions";

const initialState = {
  errorMessage: "",
  successMessage: "",
  showLoading: false,
  userTask: [],
};

export function AuthReducer(state = initialState, action) {
  if (action.type === LOGIN_CONFIRMED_ACTION) {
    return {
      ...state,
      errorMessage: "",
      showLoading: false,
    };
  }

  if (action.type === LOGOUT_ACTION) {
    console.log("in auth reducer logout action");
    return {
      ...state,
      errorMessage: "",
      successMessage: "Logout Successfully",
    };
  }

  return state;
}
