import initialState from './initialState';
import { reducer as pollTestAction } from './pollTestAction';
import { reducer as getPolls } from './getPolls';
import { reducer as getVotes } from './getVotes';

const reducers = [
  pollTestAction,
  getPolls,
  getVotes
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
