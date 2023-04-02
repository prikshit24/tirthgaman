import {
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_SUCCESS,
  } from '../../ActionTypes/UserActionType';
  
  let initialState = {
    error: false,
    forgotPassword_details: null,
    loading: false,
  };
  export default ForgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD: {
        return {
          ...state,
          error: false,
          loading: true,
          forgotPassword_details: null,
        };
      }
      case FORGOT_PASSWORD_SUCCESS: {
        return {
          ...state,
          error: false,
          loading: false,
          forgotPassword_details: action.payload,
        };
      }
      case FORGOT_PASSWORD_FAILED: {
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
  