import $ from 'jquery';
import {
  GET_POLLS_BEGIN,
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
  GET_POLLS_DISMISS_ERROR,
} from './constants';


const error = () => {
  dispatch({
    type: GET_POLLS_FAILURE,
    data: {},
  });
}

const success = (data) => {
  debugger;
  dispatch({
    type: GET_POLLS_SUCCESS,
    data,
  });
}

export function getPolls() {
  return dispatch => {
    dispatch({
      type: GET_POLLS_BEGIN,
    });

    $.ajax({
      method: 'GET',
      url: 'localhost:3000/polls',
      success,
      error
    });
  };
}

export function dismissGetPollsError() {
  return {
    type: GET_POLLS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GET_POLLS_BEGIN:
      return {
        ...state,
        getPollsPending: true,
        getPollsError: null,
      };

    case GET_POLLS_SUCCESS:
      return {
        ...state,
        getPollsPending: false,
        getPollsError: null,
        polls: action.data
      };

    case GET_POLLS_FAILURE:
      return {
        ...state,
        getPollsPending: false,
        getPollsError: action.data.error,
      };

    case GET_POLLS_DISMISS_ERROR:
      return {
        ...state,
        getPollsError: null,
      };

    default:
      return state;
  }
}
