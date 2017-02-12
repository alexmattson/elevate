import initialState from './initialState';
import {
  RECEIVE_DATA
} from './constants';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      debugger;
      return state;

    default:
      return state;
  }
}
