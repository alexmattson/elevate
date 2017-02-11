export function addError(error) {
  return {
    type: ADD_ERROR,
    error
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS,
  };
}
