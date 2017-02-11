import fetch from 'isomorphic-fetch';
import {
  FETCH_POLLS_BEGIN,
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLLS_DISMISS_ERROR,
} from './constants';

export function fetchPolls() {
  return dispatch => {
    dispatch({
      type: FETCH_POLLS_BEGIN,
    });
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch('/polls');
        if (res.ok) {
          const json = await res.json();
          dispatch({
            type: FETCH_POLLS_SUCCESS,
            data: json,
          });
          resolve(json);
        } else {
          throw new Error(res);
        }
      } catch (err) {
        dispatch({
          type: FETCH_POLLS_FAILURE,
          data: {},
        });
        reject(err);
      }
    }).catch(() => {});
  };
}

export function dismissFetchPollsError() {
  return {
    type: FETCH_POLLS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FETCH_POLLS_BEGIN:
      return {
        ...state,
        fetchPollsPending: true,
        fetchPollsError: null,
      };

    case FETCH_POLLS_SUCCESS:
      return {
        ...state,
        fetchPollsPending: false,
        fetchPollsError: null,
        polls: action.data
      };

    case FETCH_POLLS_FAILURE:
      return {
        ...state,
        fetchPollsPending: false,
        fetchPollsError: action.data.error,
      };

    case FETCH_POLLS_DISMISS_ERROR:
      return {
        ...state,
        fetchPollsError: null,
      };

    default:
      return state;
  }
}
