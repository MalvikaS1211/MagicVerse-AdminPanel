import {
    LOADING_TOGGLE_ACTION,
    LOGIN_CONFIRMED_ACTION,
    LOGIN_FAILED_ACTION,
    LOGOUT_ACTION,
    SET_USER_TASK,
    SET_USER_DETAIL,
    SIGNUP_CONFIRMED_ACTION,
    SIGNUP_FAILED_ACTION,
    SELECT_CHAIN_ACTION,
} from '../actions/AuthActions';

const initialState = {
    auth: {
        email: '',
        idToken: '',
        localId: '',
        expiresIn: '',
        refreshToken: '',
    },
    errorMessage: '',
    successMessage: '',
    showLoading: false,
    userTask:[],
};

export function AuthReducer(state = initialState, action) {
    if (action.type === SIGNUP_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
            successMessage: 'Signup Successfully Completed',
            showLoading: false,
        };
    }
    if (action.type === SELECT_CHAIN_ACTION) {
        return {
            ...state,
            selectChain: action.payload,
            errorMessage: '',
           // successMessage: 'Login Successfully Completed',
            showLoading: false,
        };
    }

    if (action.type === LOGIN_CONFIRMED_ACTION) {
        return {
            ...state,
            auth: action.payload,
            errorMessage: '',
           // successMessage: 'Login Successfully Completed',
            showLoading: false,
        };
    }

    if (action.type === SET_USER_TASK) {
        return {
            ...state,
            userTask: action.payload,
            errorMessage: '',
           // successMessage: 'Login Successfully Completed',
            showLoading: false,
        };
    }
    if (action.type === SET_USER_DETAIL) {
        return {
            ...state,
            userTask: action.payload,
            errorMessage: '',
           // successMessage: 'Login Successfully Completed',
            showLoading: false,
        };
    }

    if (action.type === LOGOUT_ACTION) {
     //   console.log("dbfgvf ghfbjf123654")
            return {
            ...state,
            errorMessage: '',
            successMessage: '',
            auth: {
                email: '',
                idToken: '',
                localId: '',
                expiresIn: '',
                refreshToken: '',
                
            },
            
        };
      
    }

    if (
        action.type === SIGNUP_FAILED_ACTION ||
        action.type === LOGIN_FAILED_ACTION
    ) {
        return {
            ...state,
            errorMessage: action.payload,
            successMessage: '',
            showLoading: false,
        };
    }

    if (action.type === LOADING_TOGGLE_ACTION) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }
    return state;
}

    
