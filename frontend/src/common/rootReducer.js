import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import pollReducer from '../features/poll/redux/reducer';
import errorReducer from './errors/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  home: homeReducer,
  polls: pollReducer,
  errors: errorReducer
});

export default rootReducer;
