import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import pollReducer from '../features/poll/redux/reducer';
import errorReducer from './errors/reducer';
import pubnubReducer from './pubnub/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  home: homeReducer,
  polls: pollReducer,
  errors: errorReducer,
  pubnub: pubnubReducer
});

export default rootReducer;
