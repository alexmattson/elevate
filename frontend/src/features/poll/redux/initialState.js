const initialState = {
  count: 0,
  polls: [],
  results: {
    votingData: {
      yes: 0,
      no: 0
    },
    emailData: []
  },

  getPollsError: null,
  getPollsPending: false,

  postPollsError: null,
  postPollsPending: false,

};

export default initialState;
