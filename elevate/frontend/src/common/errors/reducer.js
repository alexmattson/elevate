import initialState from './initialState';
import {
  ADD_ERROR,
  REMOVE_ERROR,
  CLEAR_ERRORS
} from './constants';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ERROR:
      return {
        count: state.count + 1,
        errors: state.list.push(action.error),
      };

    case REMOVE_ERROR:
      let newList = state.list.slice(0);
      newList.shift()
      return {
        count: state.count - 1,
        errors: newList,
      };

    case CLEAR_ERRORS:
      return {
        count: 0,
        errors: [],
      };

    default:
      return state;
  }
}
