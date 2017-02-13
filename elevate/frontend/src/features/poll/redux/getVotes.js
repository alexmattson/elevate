import {
  ADD_RESULTS
} from './constants';

export function addVote(vote) {
    return {
        type: ADD_VOTE,
        payload: vote,
    };
}

export function addResults(results) {
  return {
    type: ADD_RESULTS,
    payload: results
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case ADD_RESULTS:
      return {
        ...state,
        results: action.payload
      };

    default:
      return state;
  }
}
