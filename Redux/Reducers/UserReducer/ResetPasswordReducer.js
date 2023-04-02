import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
  } from '../../ActionTypes/UserActionType';
  
  let initialState = {
    error: false,
    resetPassword_details: null,
    loading: false,
  };
  export default ResetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
      case RESET_PASSWORD: {
        return {
          ...state,
          error: false,
          loading: true,
          forgotPassword_details: null,
        };
      }
      case RESET_PASSWORD_SUCCESS: {
        return {
          ...state,
          error: false,
          loading: false,
          forgotPassword_details: action.payload,
        };
      }
      case RESET_PASSWORD_FAILED: {
        return {
          ...state,
          error: true,
          loading: false,
          forgotPassword_details: null,
        };
      }
      default:
        return state;
    }
  };
  