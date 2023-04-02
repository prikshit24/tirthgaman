import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
  } from '../../ActionTypes/UserAction_Type';
  
  let initialState = {
    error: false,
    login_details: null,
    loading: false,
  };
  export default LoginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_USER: {
        return {
          ...state,
          error: false,
          loading: true,
          login_details: null,
        };
      }
      case LOGIN_USER_SUCCESS: {
        return {
          ...state,
          error: false,
          loading: false,
          login_details: action.payload,
        };
      }
      case LOGIN_USER_FAILED: {
        return {
          ...state,
          error: true,
          loading: false,
          login_details: null,
        };
      }
      default:
        return state;
    }
  };
  