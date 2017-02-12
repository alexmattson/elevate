const initialState = {
  count: 0,
  polls: [],
  results: {yes: 0, no: 0},

  getPollsError: null,
  getPollsPending: false,

  postPollsError: null,
  postPollsPending: false,

};

export default initialState;
