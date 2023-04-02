import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from '../Reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = createStore(
  AppReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default configureStore;
