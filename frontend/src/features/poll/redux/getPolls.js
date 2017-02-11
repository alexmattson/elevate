import $ from 'jquery';
import {
  GET_POLLS_BEGIN,
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
  GET_POLLS_DISMISS_ERROR,
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

    default:
      return state;
  }
}
