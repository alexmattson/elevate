import { expect } from 'chai';

import {
  POLL_TEST_ACTION,
} from 'features/poll/redux/constants';

import {
  pollTestAction,
  reducer,
} from 'features/poll/redux/pollTestAction';

describe('poll/redux/pollTestAction', () => {
  it('action: pollTestAction', () => {
    const expectedAction = {
      type: POLL_TEST_ACTION,
    };
    expect(pollTestAction()).to.deep.equal(expectedAction);
  });

  it('reducer should handle POLL_TEST_ACTION', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: POLL_TEST_ACTION }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
