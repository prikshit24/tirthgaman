import {combineReducers} from 'redux';
import RegistrationReducer from '../Reducers/UserReducer/RegistrationReducer';
import ForgotPasswordReducer from '../Reducers/UserReducer/ForgotPasswordReducer';
import ResetPasswordReducer from '../Reducers/UserReducer/ResetPasswordReducer';


export default AppReducer = combineReducers({
  registration: RegistrationReducer,
  forgotPassword:ForgotPasswordReducer,
  resetPassword:ResetPasswordReducer
});
