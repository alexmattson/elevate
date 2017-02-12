import $ from 'jquery';
import {
  GET_POLLS_BEGIN,
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
  GET_POLLS_DISMISS_ERROR,
  RECEIVE_POLL,
  ADD_VOTE
} from './constants';
import { addError } from '../../../common/errors/actions';


const error = (error) => {
  dispatch(addError(error));
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

export function addVote(vote) {
    return {
        type: ADD_VOTE,
        payload: vote,
    };
}

export function getPoll(pollId) {
  return dispatch => {
    dispatch({
      type: GET_POLLS_BEGIN,
    });

    $.get('/api/polls/' + pollId )
      .done((data) => dispatch(receivePoll(data)))
      .fail((xhr) => console.log(xhr.responseText))
  };
}

export function receivePoll(poll) {
  return {
    type: RECEIVE_POLL,
    payload: poll
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GET_POLLS_BEGIN:
      return {
        ...state,
        getPollsPending: true,
      };

    case GET_POLLS_SUCCESS:
      return {
        ...state,
        getPollsPending: false,
        polls: action.data
      };

    case GET_POLLS_FAILURE:
      return {
        ...state,
        getPollsPending: false,
      };

    case RECEIVE_POLL:
      return {
        ...state,
        getPollPending: false,
        currentPoll: action.payload
      }
    default:
      return state;
  }
}
