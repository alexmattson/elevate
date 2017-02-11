import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  home: homeReducer,
});

export default rootReducer;
