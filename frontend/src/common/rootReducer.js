import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import pollReducer from '../features/poll/redux/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  home: homeReducer,
  polls: pollReducer,
});

export default rootReducer;
