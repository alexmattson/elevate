import initialState from './initialState';
import {
  RECEIVE_DATA,
  RECEIVE_MESSAGE
} from './constants';

export default function reducer(state = initialState, action) {
  let pollName;
  switch (action.type) {
    case RECEIVE_DATA:
      pollName = action.data.channel;
      return {
        ...state,
        polls: {}
      };

    case RECEIVE_MESSAGE:
      pollName = action.data.channel;
      let newState = Object.assign(state);
      newState.polls[pollName] = newState.polls[pollName] || { events: [] };
      newState.polls[pollName].events.push(action.data.message);
      return newState;

    default:
      return state;
  }
}
