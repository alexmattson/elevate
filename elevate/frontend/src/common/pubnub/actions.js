import { RECEIVE_DATA, RECEIVE_MESSAGE } from './constants';

export function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data
  };
}

export function receiveMessage(data) {
  return {
    type: RECEIVE_MESSAGE,
    data
  };
}
