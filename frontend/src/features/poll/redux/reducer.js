import initialState from './initialState';
import { reducer as pollTestAction } from './pollTestAction';
import { reducer as getPolls } from './getPolls';

const reducers = [
  pollTestAction,
  getPolls
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
