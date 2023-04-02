import UserApi from '../../Axios/UserApi';
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../ActionTypes/UserActionType';

export const registerUser = params => async dispatch => {
  try {
    dispatch({
      type: REGISTER_USER,
      payload: null,
    });
    const userResponse = await UserApi.post('/signup', params);
    if (userResponse?.data?.status === 201) {
      console.log('userResponse',userResponse)
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: userResponse?.data,
      });
    }
    return userResponse;
  } catch (e) {
    dispatch({
      type: REGISTER_USER_FAILED,
      payload: e.response,
    });
  }
};

export const forgotPassword = params => async dispatch => {
  try {
    dispatch({
      type: FORGOT_PASSWORD,
      payload: null,
    });
    const userForgotPassword = await UserApi.post(
      '/password/reset-link',
      params,
    );
    if (userForgotPassword?.status === 200) {
      console.log('userForgotPassword',userForgotPassword)
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: params,
      });
    }
    return userForgotPassword;
  } catch (error) {
    console.log(error);
    dispatch({
      type: FORGOT_PASSWORD_FAILED,
      payload: null,
    });
  }
};

export const resetPassword = params => async dispatch => {
  try {
    dispatch({
      type: RESET_PASSWORD,
      payload: null,
    });
    const userResetPassword = await UserApi.post(
      '/password/reset-link',
      params,
    );
    if (userResetPassword?.status === 200) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: params,
      });
    }
    return userResetPassword;
  } catch (error) {
    console.log(error);
    dispatch({
      type: RESET_PASSWORD_FAILED,
      payload: null,
    });
  }
};
