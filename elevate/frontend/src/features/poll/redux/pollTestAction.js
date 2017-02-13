import {
  POLL_TEST_ACTION,
} from './constants';

export function pollTestAction() {
  return {
    type: POLL_TEST_ACTION,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case POLL_TEST_ACTION:
      return {
        ...state,
      };

    default:
      return state;
  }
}
