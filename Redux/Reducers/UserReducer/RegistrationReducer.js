import {
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
  } from '../../ActionTypes/UserActionType';
  
  let initialState = {
    error: false,
    registration_details: null,
    loading: false,
  };
  
  export default RegistrationReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_USER: {
        return {
          ...state,
          error: false,
          loading: true,
          registration_details: null,
        };
      }
      case REGISTER_USER_SUCCESS: {
        return {
          ...state,
          error: false,
          loading: false,
          registration_details: action.payload,
        };
      }
      case REGISTER_USER_FAILED: {
        return {
          ...state,
          error: true,
          loading: false,
          registration_details: null,
        };
      }
      default:
        return state;
    }
  };
  